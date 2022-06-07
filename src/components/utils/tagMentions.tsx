
import getTags from "../utils/getTags";
import getMentions from "../utils/getMentions";


import { differenceArrayAFromArrayB } from "../utils/differenceAFromB";
import { arrayFromObjProp } from "../utils/arrayFromObjProp";

import { flattenSimpleArray } from "../utils/flattenSimpleArray";

import { 
    fetchTagNameByComment, 
    fetchMentionsByComment, 
    insertTagIfNotExist, 
    insertTagCommentRelation, 
    insertMentionRelation, 
    deleteTagCommentRelation, 
    deleteMentionRelation,
    fetchForEachIndexInAnArray,
    fetchForEachIndexInAnArrayCommentID 
} from "./fetchTagsMentions";

export const tagsMentionsEdit = async (comment_id: string, new_text: string) => {

    let oldTagsNameObject = await fetchTagNameByComment(comment_id)
    let oldMentionsNameObject = await fetchMentionsByComment(comment_id)


    let oldTags = arrayFromObjProp(oldTagsNameObject, "tag_name");
    let oldMentions = arrayFromObjProp(oldMentionsNameObject, "nickname");


    let newTagsArrays = await getTags(new_text)
    let newMentionsArrays = await getMentions(new_text)
    

    let newTags = flattenSimpleArray(newTagsArrays);
    let newMentions = flattenSimpleArray(newMentionsArrays);
    
    // const tagsToDelete =  oldTags.filter(tag => !newTags.includes(tag))
    const tagsToDelete =  differenceArrayAFromArrayB(oldTags, newTags);
    const tagsToAdd =  differenceArrayAFromArrayB(newTags, oldTags);

    const mentionsToDelete =  differenceArrayAFromArrayB(oldMentions, newMentions)
    const mentionsToAdd =  differenceArrayAFromArrayB(newMentions, oldMentions)

    // console.log("toAdd: ", tagsToAdd, " toDelete: ", tagsToDelete)

    fetchForEachIndexInAnArray(tagsToAdd, insertTagIfNotExist);
    fetchForEachIndexInAnArrayCommentID(tagsToAdd, comment_id, insertTagCommentRelation);


    fetchForEachIndexInAnArrayCommentID(tagsToDelete, comment_id, deleteTagCommentRelation);

    fetchForEachIndexInAnArrayCommentID(mentionsToAdd, comment_id, insertMentionRelation);
    fetchForEachIndexInAnArrayCommentID(mentionsToDelete, comment_id, deleteMentionRelation);

}

export const tagsMentionsCreate = async (comment_id: string, new_text: string) => {

    let newTagsArrays = await getTags(new_text)
    let newMentionsArrays = await getMentions(new_text)
    

    let newTags = flattenSimpleArray(newTagsArrays);
    let newMentions = flattenSimpleArray(newMentionsArrays);
    
    // const tagsToDelete =  oldTags.filter(tag => !newTags.includes(tag))
    const tagsToAdd =  differenceArrayAFromArrayB(newTags, []);

    const mentionsToAdd =  differenceArrayAFromArrayB(newMentions, [])

    // console.log("toAdd: ", tagsToAdd, " toDelete: ", tagsToDelete)

    fetchForEachIndexInAnArray(tagsToAdd, insertTagIfNotExist);
    fetchForEachIndexInAnArrayCommentID(tagsToAdd, comment_id, insertTagCommentRelation);

    fetchForEachIndexInAnArrayCommentID(mentionsToAdd, comment_id, insertMentionRelation);

}