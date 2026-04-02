import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

function verifySignature(orderId: string, paymentId: string, signature: string): boolean {
  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
    .update(`${orderId}|${paymentId}`)
    .digest('hex')

  return generatedSignature === signature
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, amount, currency, receipt, plan, razorpay_order_id, razorpay_payment_id, razorpay_signature } = body

    if (action === 'create_order') {
      const Razorpay = require('razorpay')
      
      const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID!,
        key_secret: process.env.RAZORPAY_KEY_SECRET!,
      })

      const options = {
        amount: (amount || 1999) * 100,
        currency: currency || 'INR',
        receipt: receipt || `rcpt_${Date.now()}`,
        notes: { plan: plan || 'student' }
      }

      const order = await instance.orders.create(options)

      return NextResponse.json({
        success: true,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency
      })
    }

    if (action === 'verify') {
      const isValid = verifySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature)
      
      if (isValid) {
        return NextResponse.json({ success: true, message: 'Payment verified' })
      } else {
        return NextResponse.json({ success: false, message: 'Invalid signature' }, { status: 400 })
      }
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error: any) {
    console.error('Razorpay Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
