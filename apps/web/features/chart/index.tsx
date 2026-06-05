export const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#141522] text-white px-4 py-2 rounded-xl text-xs font-semibold relative mb-2 shadow-md after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-[6px] after:border-transparent after:border-t-[#141522]">
        {payload[0].value} Task
      </div>
    )
  }
  return null
}

export const CustomizedDot = (props: any) => {
  const { cx, cy, payload } = props
  if (payload.showTooltip) {
    return (
      <g>
        <circle cx={cx} cy={cy} r={8} fill="#FAFAFA" stroke="#546FFF" strokeWidth={3} />
        <circle cx={cx} cy={cy} r={3} fill="#546FFF" />
      </g>
    )
  }
  return null
}