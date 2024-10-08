import addLines from "./helpers/addLines.js"
import prepChart from "./helpers/prepChart.js"

export default function logLineChart(
    data: { [key: string]: unknown }[],
    x: string,
    y: string,
    options: {
        formatX?: (d: unknown) => string
        formatY?: (d: unknown) => string
        smallMultiples?: string
        fixedScales?: boolean
        smallMultiplesPerRow?: number
        width?: number
        height?: number
    } = {}
) {
    console.log(
        `\nLine chart: "${y}" over "${x}"${options.smallMultiples ? `, for each "${options.smallMultiples}"` : ""}\n`
    )

    prepChart(data, x, y, addLines, options)
}
