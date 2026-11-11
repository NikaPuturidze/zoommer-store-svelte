import { handleResponse } from '.';

export interface ContentResponse {
	section: Section[];
}

export enum SectionType {
	First = 1,
	Fifth = 5
}

export interface Section {
	activeOrders: unknown[] | null;
	bannerFinishDate: Date | null;
	bannerPosition: number | null;
	bannerTemplateRowNumber: number;
	banners: Banner[] | null;
	brands: Brand[] | null;
	categories: null;
	colorValue: null | string;
	id: number;
	isAbsoulteRoute: boolean;
	isActiveOrderSection: boolean;
	isScroll: boolean | null;
	orderNumber: number;
	products: Product[] | null;
	promotionFinishDate: null;
	promotionProducts: null;
	route: null | string;
	sectionType: SectionType;
	title: null | string;
}

export interface Banner {
	bannerType: number;
	categoryId: null;
	categoryName: null;
	isAbsoluteUrl: boolean;
	largeBanner: boolean;
	mobileDimensions: Dimensions | null;
	mobileImageUrl: string;
	orderNo: number;
	position: number;
	productId: null;
	promotionId: null;
	route: string;
	title: string;
	webDimensions: Dimensions | null;
	webImageUrl: string;
}

export interface Dimensions {
	heightInPixels: number;
	widthInPixels: number;
}

export interface Brand {
	id: number;
	imageUrl: string;
	name: string;
	orderNo: number;
	route: string;
}

export interface Product {
	badgeIds: null;
	badges: null;
	barCode: string;
	brandName: string;
	bundleIsInCart: boolean;
	categoryId: number;
	categoryIds: number[];
	categoryName: string;
	comingSoonText: null;
	disableBuyButton: boolean;
	discountAmount: number;
	discountPercent: number;
	doNotRecordStock: boolean;
	giftType: null;
	gifts: null;
	hasDiscount: boolean;
	iconUrl: null;
	id: number;
	imageUrl: string;
	isBooked: boolean;
	isFavorite: boolean;
	isInCart: boolean;
	isPurchased: boolean;
	labelColor: LabelColor | null;
	labelText: LabelText | null;
	name: string;
	onSale: boolean;
	onSaleSoon: boolean;
	orderNo: number;
	parentCategoryName: string;
	preOrder: null;
	preSalePrice: null;
	previousPrice: number | null;
	price: number;
	priceDisplay: string;
	productFrame: null;
	productFrameResponsive: null;
	requestedQuantity: number;
	route: string;
	subCategoryId: number;
}

export enum LabelColor {
	A3Bcff = '#a3bcff'
}

export enum LabelText {
	BestPrice = 'BEST PRICE',
	Gifts = 'GIFTS',
	New = 'NEW'
}

export function getContentService(fetcher: typeof fetch): Promise<ContentResponse> {
	return fetcher('/api/zoommer/Content/get-content-v2').then(handleResponse<ContentResponse>);
}
