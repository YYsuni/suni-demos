declare module '*.svg' {
	export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
	export default ReactComponent
}
declare module '*.svg?url' {
	const content: StaticImageData

	export default content
}

declare module '*.glb' {
	const content: string
	export default content
}

declare module '*.gltf' {
	const content: string
	export default content
}

declare module '*.vert' {
	const content: string
	export default content
}

declare module '*.frag' {
	const content: string
	export default content
}

declare module '*.glsl' {
	const content: string
	export default content
}

declare type NullableNumber = string | number | null
declare type NullableObject = Record<string, any> | null
declare type NullableArray = Record<string, any>[] | null
declare type Nullable<T> = T | null

declare type Res<T = any> = {
	data: T
	message: string
	code: number
}
