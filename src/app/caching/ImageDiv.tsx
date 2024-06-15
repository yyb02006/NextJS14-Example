import Image from 'next/image'

export const ImageDiv = ({ url, description }: { url: string; description: string }) => {
  return (
    <div className="border border-sky-600">
      <div className="relative flex h-[225px] w-[400px] items-center justify-center">
        {url ? <Image alt="altImg" src={url} className="object-cover" fill /> : 'loading image...'}
      </div>
      <span className="text-rose-400">{description}</span>
    </div>
  )
}
