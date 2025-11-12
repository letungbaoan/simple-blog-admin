import { NextResponse } from 'next/server'
import { Post } from '@/types/post.d'

const mockPosts: Post[] = [
  {
    id: 'hanh-trinh-nau-an',
    title: 'Hành trình học nấu ăn: Từ Zero đến Đầu bếp',
    content:
      'Bắt đầu từ một người không biết gì ngoài mì gói, tôi đã dần khám phá ra niềm vui trong căn bếp. Bí quyết là sự kiên nhẫn và không sợ thất bại. Món đầu tiên tôi nấu thành công là món phở cuốn, đơn giản mà tuyệt vời.',
    author: 'Gia Đình',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'meo-du-lich',
    title: '5 mẹo nhỏ giúp chuyến du lịch tiết kiệm và thú vị hơn',
    content:
      'Đừng bao giờ đặt vé vào phút chót! Hãy tận dụng các ứng dụng so sánh giá, đi du lịch vào mùa thấp điểm, và đặc biệt là hãy thử trải nghiệm phương tiện giao thông công cộng địa phương để cảm nhận văn hóa.',
    author: 'Phượt Thủ',
    createdAt: new Date().toISOString()
  },
  {
    id: 'phat-trien-ban-than',
    title: 'Bí quyết đọc sách hiệu quả: Tăng tốc độ và ghi nhớ lâu hơn',
    content:
      'Thay vì chỉ đọc lướt, hãy áp dụng kỹ thuật Skimming và Scanning trước khi đi sâu. Luôn ghi chép lại các ý chính bằng tay. Việc này giúp não bộ xử lý thông tin và củng cố trí nhớ một cách đáng kể.',
    author: 'Quản Lý',
    createdAt: new Date(Date.now() - 172800000).toISOString()
  }
]

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json(mockPosts)
}

export function getMockPost(postId: string): Post | undefined {
  return mockPosts.find((post) => post.id === postId)
}
