export default function getAxisX(
    data: { [key: string]: unknown }[],
    x: string,
    options: {
        xMin: number
        xMax: number
        width: number
        formatX: (d: unknown) => string
    }
) {
    const xLabelFirst = options.formatX(options.xMin)
    const xLabelLast = options.formatX(options.xMax)

    if (!xLabelFirst || !xLabelLast) {
        throw new Error(`The first or last ${x} is null or undefined.`)
    }

    options.width = Math.max(
        options.width,
        xLabelFirst.length + 3 + xLabelLast.length
    )

    const xAxis = []
    for (let i = 0; i < options.width; i++) {
        if (i < xLabelFirst.length) {
            xAxis.push(xLabelFirst[i])
        } else if (i >= options.width - xLabelLast.length) {
            xAxis.push(xLabelLast[i - (options.width - xLabelLast.length)])
        } else {
            xAxis.push(" ")
        }
    }

    const xTicks = []
    const greyDash = "\x1b[90m─\x1b[0m"
    for (let i = 0; i < options.width; i++) {
        xTicks.push(greyDash)
    }
    const topFrame = []
    for (let i = 0; i <= options.width; i++) {
        if (i === 0) {
            topFrame.push("\x1b[90m┌\x1b[0m")
        } else {
            topFrame.push(greyDash)
        }
    }

    return { xAxis, xTicks, topFrame, xLabels: [xLabelFirst, xLabelLast] }
}
