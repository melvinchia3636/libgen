import type { IDownloadTypes, ISearchFields } from './types';

export const downloadTypes: IDownloadTypes = [
	{ id: 0, name: 'Resumed dl with original filename' },
	{ id: 1, name: 'Resumed dl with transit filename' },
	{ id: 2, name: 'Resumed dl with md5 filename' },
	{ id: 3, name: 'Open file in browser' }
];

export const searchFields: ISearchFields = [
	{ id: 'def', name: 'Default' },
	{ id: 'title', name: 'Title' },
	{ id: 'author', name: 'Author(s)' },
	{ id: 'series', name: 'Series' },
	{ id: 'publisher', name: 'Publisher' },
	{ id: 'year', name: 'Year' },
	{ id: 'identifier', name: 'ISBN' },
	{ id: 'language', name: 'Language' },
	{ id: 'md5', name: 'MD5' },
	{ id: 'tags', name: 'Tags' },
	{ id: 'extension', name: 'Extension' }
];
