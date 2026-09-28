import { searchTool } from "../../config/tavily.js";

export const searchAgent = async (state) => {
    try {
        const response = await searchTool.invoke({
            query: state.prompt,
        })

        const searchResults = response.results.map((result) => ({ title: result.title, url: result.url, content: result.content, }));
        console.log(searchResults);
        console.log(response.images);

        return {
            ...state,
            searchResults: searchResults,
            images: response.images
        }
    } catch (error) {
        return {
            ...state,
            searchResults: [],
            images: []
        }
    }
}