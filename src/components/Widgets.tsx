import type { CSSProperties } from 'react'
import { useClock } from '../hooks/useClock'
import { CloudIcon, MoonIcon, PartlyCloudyIcon } from './icons/WeatherSymbols'
import './Widgets.css'

const forecast = [
  { time: 'Now', Icon: PartlyCloudyIcon, temp: 24 },
  { time: '1AM', Icon: CloudIcon, temp: 23 },
  { time: '2AM', Icon: CloudIcon, temp: 22 },
  { time: '3AM', Icon: MoonIcon, temp: 21 },
  { time: '4AM', Icon: MoonIcon, temp: 20 },
] as const

export function Widgets() {
  const { widgetTime } = useClock()

  return (
    <aside className="widgets" aria-label="Desktop widgets">
      <div className="widget widget--weather">
        <div className="widget-weather__top">
          <span className="widget-weather__city">hello world</span>
          <PartlyCloudyIcon size={20} />
        </div>
        <div className="widget-weather__hero">
          <span className="widget-weather__temp">24°</span>
          <span className="widget-weather__condition">Partly Cloudy</span>
        </div>
        <div className="widget-weather__forecast">
          {forecast.map((slot) => (
            <div key={slot.time} className="widget-weather__slot">
              <span className="widget-weather__slot-time">{slot.time}</span>
              <slot.Icon size={14} />
              <span className="widget-weather__slot-temp">{slot.temp}°</span>
            </div>
          ))}
        </div>
      </div>

      <div className="widget widget--clock">
        <div className="widget-clock__face">
          <div className="widget-clock__ticks" aria-hidden />
          <time className="widget-clock__time">{widgetTime}</time>
        </div>
      </div>

      <div className="widget widget--battery">
        <div className="widget-battery__gauge" style={{ '--level': '4%' } as CSSProperties}>
          <svg viewBox="0 0 72 72" className="widget-battery__svg" aria-hidden>
            <circle cx="36" cy="36" r="30" className="widget-battery__track" />
            <circle cx="36" cy="36" r="30" className="widget-battery__fill" />
          </svg>
          <div className="widget-battery__icon">
            <LaptopIcon />
          </div>
        </div>
        <span className="widget-battery__pct">4%</span>
      </div>
    </aside>
  )
}

function LaptopIcon() {
  return (
    <svg width="26" height="20" viewBox="0 0 28 22" aria-hidden>
      <rect x="3" y="2" width="22" height="14" rx="2" fill="none" stroke="rgba(255,255,255,0.92)" strokeWidth="1.4" />
      <path d="M0 20h28l-2-3H2l-2 3z" fill="rgba(255,255,255,0.88)" />
    </svg>
  )
}
