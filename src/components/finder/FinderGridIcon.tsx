type Props = {
  src: string
  size: number
  label: string
}

export function FinderGridIcon({ src, size, label }: Props) {
  return (
    <img
      src={src}
      alt=""
      className="finder-grid__icon"
      width={size}
      height={size}
      draggable={false}
      decoding="async"
      aria-hidden
      title={label}
    />
  )
}
