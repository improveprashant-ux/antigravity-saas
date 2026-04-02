import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const sector = searchParams.get('sector')
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy') || 'name'
    const order = searchParams.get('order') || 'asc'
    const limit = parseInt(searchParams.get('limit') || '100')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = getSupabase()
      .from('careers')
      .select('*')

    // Apply filters
    if (sector && sector !== 'All') {
      query = query.eq('sector', sector)
    }
    
    if (category && category !== 'All') {
      query = query.eq('category', category)
    }
    
    if (search) {
      query = query.ilike('name', `%${search}%`)
    }

    // Apply sorting
    query = query.order(sortBy as any, { ascending: order === 'asc' })

    // Apply pagination
    query = query.range(offset, offset + limit - 1)

    const { data, error, count } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      careers: data,
      total: count,
      limit,
      offset
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
