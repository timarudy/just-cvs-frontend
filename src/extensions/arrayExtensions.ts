import { LanguageSkill } from "../components/forms/inputs/LanguageSkillsInput";
import { SocialMedia } from "../components/forms/inputs/SocialMediaInput";
import { TagType } from "../components/forms/inputs/TagsInput";
import { LanguageType, SocialMediaType } from "../types/userTypes";

export function extractTagValues(arr: TagType[]): string[] {
    return arr.map((tagElement) => tagElement.tag);
}

export function extractSocialMediaValues(arr: SocialMedia[]): SocialMediaType[] {
    return arr.map((socialMedia) => ({
        name_of_social_media: socialMedia.name_of_social_media,
        url: socialMedia.url,
    }));
}

export function extractLanguagesValues(arr: LanguageSkill[]): LanguageType[] {
    return arr.map((language) => ({
        name_of_language: language.name_of_language,
        level_of_language: language.level_of_language,
    }));
}

export function createTagObjects(arr: string[]): TagType[] {
    return arr.map((tag) => ({
        id: crypto.randomUUID(),
        tag,
    }));
}

export function createSocialMediaObjects(arr: SocialMediaType[]): SocialMedia[] {
    return arr.map((socialMedia) => ({
        id: crypto.randomUUID(),
        name_of_social_media: socialMedia.name_of_social_media,
        url: socialMedia.url,
    }));
}

export function createLanguageSkillObjects(arr: LanguageType[]): LanguageSkill[] {
    return arr.map((language) => ({
        id: crypto.randomUUID(),
        name_of_language: language.name_of_language,
        level_of_language: language.level_of_language,
    }));
}