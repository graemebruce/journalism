import getCovarianceMatrix from "./getCovarianceMatrix.js"
import getMahalanobisDistance from "./getMahalanobisDistance.js"

/**
 * Computes the Mahalanobis distance for each object in an array, based on the keys and values in an origin. The function adds the key `mahaDist` in each object in the original array.
 *
 * If you pass the option `{ similarity: true }`, it will add another key `similarity` which goes from 1 to 0. The closer similarity is to 1, the closer the item is to the origin.
 *
 * @example Basic usage
 * ```js
 * // Wines
 * const data = [
 *     {'fixed acidity': 6.5, 'alcohol' : 11, ... },
 *     {'fixed acidity': 7.1, 'alcohol' : 12.2, ... },
 *     {'fixed acidity': 6.3, 'alcohol' : 10.5, ... }
 * ]
 *
 * // We want the distance from this wine. All the keys in the origin will be used as variables. They need to be present in the data, of course.
 * const origin = {'fixed acidity': 7.2, 'alcohol' : 11.3 }
 *
 * addMahalanobisDistance(origin, data)
 *
 * // We now have mahaDist in the data.
 * data.sort((a, b) => a.mahaDist - b.mahaDist)
 *
 * // And data looks like this.
 * //[
 * //  { 'fixed acidity': 7.2, alcohol: 11.3, mahaDist: 0 },
 * //  { 'fixed acidity': 7.5, alcohol: 10.5, mahaDist: 0.939 },
 * //  { 'fixed acidity': 7.3, alcohol: 11.4, mahaDist: 1.263 },
 * //  { 'fixed acidity': 6.5, alcohol: 13, mahaDist: 2.079 },
 * //  { 'fixed acidity': 7.1, alcohol: 12.2, mahaDist: 2.411 }
 * //]
 *
 * // You can also pass the option similarity if you want.
 * addMahalanobisDistance(origin, data, { similarity: true })
 *
 * // The data will have a similarity key going from 0 to 1.
 * // [
 * //  { "fixed acidity": 7.2, alcohol: 11.3, mahaDist: 0, similarity: 1 },
 * //  { "fixed acidity": 7.5, alcohol: 10.5, mahaDist: 0.939, similarity: 0.611 },
 * //  { "fixed acidity": 7.3, alcohol: 11.4, mahaDist: 1.263, similarity: 0.476 },
 * //  { "fixed acidity": 6.5, alcohol: 13, mahaDist: 2.079, similarity: 0.138 },
 * //  { "fixed acidity": 7.1, alcohol: 12.2, mahaDist: 2.412, similarity: 0 }
 * // ]
 * ```
 *
 * @category Statistics
 *
 */

export default function addMahalanobisDistance(
    origin: Record<string, number>,
    data: Record<string, number>[],
    options: { similarity?: boolean } = {}
) {
    const variables = Object.keys(origin)
    const originArray = variables.map((v) => origin[v])
    const dataArray = data.map((d) => variables.map((v) => d[v]))

    const invertedCovarianceMatrix = getCovarianceMatrix(dataArray, {
        invert: true,
    })

    data.forEach(
        (d) =>
            (d.mahaDist = getMahalanobisDistance(
                originArray,
                variables.map((v) => d[v]),
                invertedCovarianceMatrix
            ))
    )

    if (options.similarity) {
        const maxDist = Math.max(...data.map((d) => d.mahaDist))
        data.forEach((d) => (d.similarity = 1 - d.mahaDist / maxDist))
    }

    return data
}
