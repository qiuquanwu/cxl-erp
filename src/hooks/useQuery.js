import { ref } from "vue"
import getData from "../lib/getData.js";
export default (queryPath, dataSource, loading) => {
    const queryText = ref("")
    const field = ref("name")
    const query = async () => {
        loading.value = true
        let data = await getData(queryPath, { queryText: queryText.value, field: field.value })
        loading.value = false
        dataSource.value = data
    }
    //查询内容

    return {
        queryText,
        field,
        query
    }
}