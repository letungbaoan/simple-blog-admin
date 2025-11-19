import { PATHS } from '@/constants/paths'
import { redirect } from 'next/navigation'

export default function HomePage() {
  redirect(PATHS.AUTH.LOGIN)
}
