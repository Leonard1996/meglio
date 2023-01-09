export default function toUniqueArrayObjects(tArray, key){
    return tArray.filter((value, index, self) =>
    index === self.findIndex((t) => (
       t[key] === value[key]
    ))
)
}