import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const phone = searchParams.get('phone')
    const userId = searchParams.get('userId')

    let query = getSupabase()
      .from('user_progress')
      .select(`
        *,
        users (
          id,
          name,
          email,
          phone,
          target_career
        )
      `)

    if (phone) {
      const { data: users } = await getSupabase()
        .from('users')
        .select('id')
        .eq('phone', phone)
        .single()
      
      if (users) {
        query = query.eq('user_id', users.id)
      }
    } else if (userId) {
      query = query.eq('user_id', userId)
    } else {
      return NextResponse.json({ error: 'Phone or userId required' }, { status: 400 })
    }

    const { data, error } = await query.single()

    if (error) {
      // Return default progress if not found
      return NextResponse.json({
        progress: {
          current_streak: 0,
          total_xp: 0,
          completed_missions: 0,
          level: 1,
          career_match: 0,
          target_career: null
        }
      })
    }

    return NextResponse.json({ progress: data })
  } catch (error) {
    console.error('Progress API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, action, data: updateData } = body

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    if (action === 'add_xp') {
      const xpAmount = updateData?.xp || 0
      
      // Get current progress
      const { data: current } = await getSupabase()
        .from('user_progress')
        .select('total_xp, level, completed_missions, current_streak')
        .eq('user_id', userId)
        .single()

      const newXp = (current?.total_xp || 0) + xpAmount
      const newLevel = Math.floor(newXp / 500) + 1 // 500 XP per level

      const { data, error } = await getSupabase()
        .from('user_progress')
        .upsert({
          user_id: userId,
          total_xp: newXp,
          level: newLevel,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        })
        .select()
        .single()

      if (error) throw error

      return NextResponse.json({ success: true, progress: data })
    }

    if (action === 'complete_mission') {
      const { data, error } = await getSupabase()
        .from('completed_missions')
        .insert({
          user_id: userId,
          mission_id: updateData?.missionId,
          completed_at: new Date().toISOString(),
          ai_feedback: updateData?.feedback || 'Mission completed!'
        })
        .select()
        .single()

      if (error) throw error

      // Also update user_progress
      await getSupabase().rpc('increment_mission_count', { user_id: userId })

      return NextResponse.json({ success: true, completedMission: data })
    }

    if (action === 'update_streak') {
      const { data, error } = await getSupabase()
        .from('user_progress')
        .upsert({
          user_id: userId,
          current_streak: updateData?.streak || 1,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        })
        .select()
        .single()

      if (error) throw error

      return NextResponse.json({ success: true, progress: data })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error: any) {
    console.error('Progress Update Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
