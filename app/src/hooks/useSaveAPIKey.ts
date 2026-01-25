import { ApiKeys } from "@/types/api";

const STORAGE_KEY = "TONEGUARD_USERS_API_KEYS";

function getApiKeys(): ApiKeys[] {
    if (typeof window === "undefined") return [];
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
}

function saveApiKey(apiData: ApiKeys) {
    const data: ApiKeys[] = getApiKeys();

    data.push(apiData);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function deleteApiKey(id: string) {
    const data: ApiKeys[] = getApiKeys();
    const filteredData = data.filter((item) => item.id.toString() !== id);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredData));
}

const useSaveAPIKey = () => {
    return { saveApiKey, getApiKeys, deleteApiKey };
};

export default useSaveAPIKey;
