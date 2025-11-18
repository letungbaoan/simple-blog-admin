'use client'

import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import { Post } from '@/types/post.d'
import { PATHS } from '@/constants/paths'

interface PostFormProps {
  initialData?: Post
  isEditMode: boolean
}

export default function PostForm({ initialData, isEditMode }: PostFormProps) {
  const { t } = useTranslation()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<Post>({
    defaultValues: initialData || { title: '', content: '', author: '', imageUrl: '' }
  })

  const onSubmit = async (data: Post) => {
    try {
      const url = '/api/posts'
      const method = isEditMode ? 'PUT' : 'POST'
      const payload = isEditMode ? { ...data, id: initialData?.id } : data

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const result = await res.json()
      if (!res.ok) throw new Error(result.message || t('api_error'))

      alert(
        isEditMode
          ? t('post_success_update', { title: result.title })
          : t('post_success_create', { title: result.title })
      )

      if (!isEditMode) {
        reset()
        router.push(PATHS.DASHBOARD.POSTS)
      } else {
        router.push(PATHS.DASHBOARD.POST_DETAIL(result.id))
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message)
      } else {
        alert(t('unknown_error'))
      }
    }
  }

  const inputClasses =
    'mt-1 block w-full rounded-md border-gray-300 border p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150'
  const labelClasses = 'block text-sm font-medium text-gray-700 mb-1'

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mx-auto max-w-lg space-y-8 rounded-xl bg-white p-8 shadow-2xl'>
      <h2 className='text-center text-3xl font-extrabold text-gray-900'>
        {isEditMode ? t('edit_post_title') : t('add_post_title')}
      </h2>

      <div>
        <label htmlFor='title' className={labelClasses}>
          {t('post_title_label')}
        </label>
        <input
          {...register('title', { required: true })}
          id='title'
          className={inputClasses}
          placeholder={t('post_title_placeholder')}
        />
        {errors.title && <span className='mt-1 text-sm text-red-600'>{t('title_required')}</span>}
      </div>

      <div>
        <label htmlFor='content' className={labelClasses}>
          {t('post_content_label')}
        </label>
        <textarea
          {...register('content', { required: true })}
          id='content'
          rows={5}
          className={`${inputClasses} resize-y`}
          placeholder={t('post_content_placeholder')}
        />
        {errors.content && <span className='mt-1 text-sm text-red-600'>{t('content_required')}</span>}
      </div>

      <div>
        <label htmlFor='author' className={labelClasses}>
          {t('post_author_label')}
        </label>
        <input
          {...register('author', { required: true })}
          id='author'
          className={inputClasses}
          placeholder={t('post_author_placeholder')}
        />
        {errors.author && <span className='mt-1 text-sm text-red-600'>{t('author_required')}</span>}
      </div>

      <div>
        <label htmlFor='imageUrl' className={labelClasses}>
          {t('post_image_url_label')}
        </label>
        <input
          {...register('imageUrl')}
          id='imageUrl'
          type='url'
          className={inputClasses}
          placeholder={t('post_image_url_placeholder')}
        />
      </div>

      <button
        type='submit'
        disabled={isSubmitting}
        className='w-full rounded-lg bg-indigo-600 px-4 py-3 text-lg font-semibold text-white shadow-lg transition duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 disabled:bg-indigo-400'
      >
        {isSubmitting ? t('saving_post') : isEditMode ? t('save_changes') : t('add_new_post')}
      </button>
    </form>
  )
}
