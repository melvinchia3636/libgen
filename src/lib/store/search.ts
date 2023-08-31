import { writable, type Writable } from 'svelte/store';
import type { ISortField, IDownloadType, ISearchField } from './types';
import { downloadTypes, searchFields } from './constants';

export const query = writable('');
export const downloadType: Writable<IDownloadType> = writable(downloadTypes[0]);
export const viewResults = writable<'simple' | 'detailed'>('simple');
export const resultsCount = writable(25);
export const searchWithMask = writable(false);
export const searchField: Writable<ISearchField> = writable(searchFields[0]);
export const sortBy = writable<ISortField | null>(null);
export const sortDirection = writable<'ASC' | 'DESC'>('ASC');
