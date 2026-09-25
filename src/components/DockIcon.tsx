type Props = {
  src: string
  label: string
}

export function DockIcon({ src, label }: Props) {
  return <img src={src} alt="" className="dock-icon__img" draggable={false} title={label} />
}
