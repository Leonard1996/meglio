export default function stringifyJson(rObject) {
    let result = null;
    try {
      result = JSON.stringify(rObject)
    } catch (error) {
      console.log(`error stringyfing object ${error}`)
    }
    return result;
  }