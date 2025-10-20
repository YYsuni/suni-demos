'use client'

import { sleep } from '@/lib/utils'
import { motion, useAnimation } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'

export default function Page() {
	const mouthControls = useAnimation()
	const mouth2Controls = useAnimation()
	const melonControls = useAnimation()
	const eyeAndBrowControls = useAnimation()

	const playingRef = useRef(false)

	const play = useCallback(async () => {
		if (playingRef.current) return

		playingRef.current = true

		// 嘴巴动画序列
		await mouthControls.start({
			scaleX: [1, 0.8, 1],
			scaleY: [1, 0.9, 1],
			x: [0, 3, 0],
			y: [0, 1, 0],
			transition: { duration: 0.6, ease: 'easeInOut' }
		})

		await Promise.all([
			// Melon 向上移动动画
			melonControls.start({
				y: -5,
				transition: { duration: 0.3, ease: 'easeInOut' }
			}),
			mouthControls.start({ opacity: 0, y: 1, transition: { duration: 0.1, ease: 'linear' } }),
			mouth2Controls.start({ opacity: 1, x: 1, y: 2, transition: { duration: 0.3, ease: 'linear' } }),
			eyeAndBrowControls.start({ x: 0.5, y: 2, transition: { duration: 0.3, ease: 'linear' } })
		])

		await sleep(100)

		await Promise.all([
			mouthControls.start({ opacity: 1, y: 0, transition: { duration: 0.3, ease: 'linear' } }),
			mouth2Controls.start({ opacity: 0, x: 0, y: 0, transition: { duration: 0.1, ease: 'linear' } }),

			melonControls.start({ y: 0, transition: { duration: 0.3, ease: 'easeInOut' } }),
			eyeAndBrowControls.start({ x: 0, y: 0, transition: { duration: 0.3, ease: 'linear' } })
		])

		await mouthControls.start({
			scaleX: [1, 0.8, 1, 0.8, 1],
			scaleY: [1, 0.9, 1, 0.9, 1],
			x: [0, 3, 0, 3, 0],
			y: [0, 1, 0, 1, 0],
			transition: { duration: 1.2, ease: 'easeInOut' }
		})

		playingRef.current = false
	}, [mouthControls, melonControls, mouth2Controls, eyeAndBrowControls])

	useEffect(() => {
		play()
	}, [play])

	return (
		<div className='flex min-h-[80vh] items-center justify-center p-20'>
			<svg onMouseMove={play} style={{ width: 120 }} viewBox='0 0 66 68' fill='none' xmlns='http://www.w3.org/2000/svg'>
				<g filter='url(#filter0_ii_1_102)'>
					<path d='M64 33C64 50.1208 50.1208 64 33 64C15.8792 64 2 50.1208 2 33C2 15.8792 15.8792 2 33 2C50.1208 2 64 15.8792 64 33Z' fill='#FFC435' />
				</g>
				<g filter='url(#filter1_f_1_102)'>
					<path
						d='M61.0938 33C61.0938 48.5157 48.5157 61.0938 33 61.0938C17.4843 61.0938 4.90625 48.5157 4.90625 33C4.90625 17.4843 17.4843 4.90625 33 4.90625C48.5157 4.90625 61.0938 17.4843 61.0938 33Z'
						fill='url(#paint0_linear_1_102)'
					/>
				</g>

				<motion.g animate={eyeAndBrowControls}>
					{/* eyebrow */}
					<path
						d='M20.7885 15.0891C21.0436 15.1641 21.3109 15.1315 21.5339 14.9875C21.7568 14.8442 21.9172 14.6014 21.9774 14.3232C22.0376 14.0451 21.992 13.7577 21.8483 13.535C21.7047 13.3118 21.4748 13.1716 21.2115 13.1344C21.2115 13.1344 21.2115 13.1344 21.2115 13.1344C21.0361 13.107 20.8564 13.0888 20.6884 13.0791C17.6576 12.8777 14.7618 14.8159 13.8155 17.4256C13.7581 17.5669 13.7056 17.7071 13.6548 17.8535C13.6249 17.9414 13.632 18.0408 13.6711 18.1285C13.7103 18.2163 13.7783 18.2851 13.8637 18.3213C13.949 18.3575 14.0457 18.3586 14.1361 18.3259C14.2263 18.293 14.3028 18.2291 14.3452 18.1465C14.3452 18.1465 14.3452 18.1465 14.3452 18.1465C14.4101 18.0203 14.4759 17.9012 14.5455 17.7825C15.7508 15.5791 18.2765 14.5412 20.4569 15.0027C20.5707 15.0268 20.6872 15.0564 20.7885 15.0891Z'
						fill='#876B2D'
					/>
					<path
						d='M44.3139 14.5175C44.0502 14.5501 43.8171 14.6863 43.6678 14.9057C43.5184 15.1246 43.465 15.4088 43.5175 15.6861C43.57 15.9633 43.7236 16.2083 43.9427 16.3574C44.1619 16.507 44.4286 16.5486 44.6861 16.4825C44.6861 16.4825 44.6861 16.4825 44.6861 16.4825C44.819 16.4467 44.9678 16.4131 45.1096 16.3845C47.7316 15.8705 50.8545 16.3771 52.4162 18.767C52.5038 18.8969 52.5837 19.025 52.6626 19.1636C52.7087 19.245 52.7881 19.3061 52.8801 19.3348C52.9722 19.3635 53.0695 19.3575 53.1536 19.3168C53.2377 19.276 53.3026 19.2033 53.3372 19.1131C53.3716 19.0231 53.3728 18.923 53.3374 18.8364C53.3374 18.8364 53.3374 18.8364 53.3374 18.8364C53.2691 18.6718 53.1987 18.5171 53.1185 18.3584C51.6849 15.3764 48.0081 14.2292 44.8635 14.4627C44.6858 14.4749 44.4956 14.4936 44.3139 14.5175Z'
						fill='#876B2D'
					/>

					{/* eyes */}
					<g filter='url(#filter2_i_1_102)'>
						<path
							d='M9 29C9 26.7909 10.7909 25 13 25H27C29.2091 25 31 26.7909 31 29C31 31.2091 29.2091 33 27 33H13C10.7909 33 9 31.2091 9 29Z'
							fill='#FEFFFC'
						/>
					</g>
					<path
						d='M9 29C9 26.7909 10.7909 25 13 25H27C29.2091 25 31 26.7909 31 29C31 31.2091 29.2091 33 27 33H13C10.7909 33 9 31.2091 9 29Z'
						stroke='#9E977C'
					/>
					<path
						d='M16.5 29C16.5 30.933 14.933 32.5 13 32.5C11.067 32.5 9.5 30.933 9.5 29C9.5 27.067 11.067 25.5 13 25.5C14.933 25.5 16.5 27.067 16.5 29Z'
						fill='#050402'
					/>
					<g filter='url(#filter3_i_1_102)'>
						<path
							d='M37 29C37 26.7909 38.7909 25 41 25H55C57.2091 25 59 26.7909 59 29C59 31.2091 57.2091 33 55 33H41C38.7909 33 37 31.2091 37 29Z'
							fill='#FEFFFC'
						/>
					</g>
					<path
						d='M37 29C37 26.7909 38.7909 25 41 25H55C57.2091 25 59 26.7909 59 29C59 31.2091 57.2091 33 55 33H41C38.7909 33 37 31.2091 37 29Z'
						stroke='#9E977C'
					/>
					<path
						d='M44.5 29C44.5 30.933 42.933 32.5 41 32.5C39.067 32.5 37.5 30.933 37.5 29C37.5 27.067 39.067 25.5 41 25.5C42.933 25.5 44.5 27.067 44.5 29Z'
						fill='#050402'
					/>
				</motion.g>

				{/* Mouth */}
				<motion.path
					d='M30 36C30.6667 36.3333 32 37.5 32 39.5C32 39.6014 31.9974 39.7006 31.9925 39.7977M31.9925 39.7977C31.8999 41.6161 30.9747 42.6836 30.5 43M31.9925 39.7977C33 40.5 35 40.5 36.5 40C38 39.5 38.5 39 39 38'
					stroke='#7B4F05'
					strokeLinecap='round'
					style={{ transformOrigin: '36px 36px' }}
					animate={mouthControls}
				/>

				<motion.path d='M29 40.5C32 42.5 36.7 42.6222 39.5 39' stroke='#7B4F05' strokeLinecap='round' opacity={0} animate={mouth2Controls} />

				{/* Cheek */}
				<g filter='url(#filter4_f_1_102)'>
					<path
						d='M20 43.5C20 47.0899 17.0899 50 13.5 50C9.91015 50 7 47.0899 7 43.5C7 39.9101 9.91015 37 13.5 37C17.0899 37 20 39.9101 20 43.5Z'
						fill='#ED9415'
					/>
				</g>
				<g filter='url(#filter5_f_1_102)'>
					<path
						d='M62 42C62 45.3137 59.0899 48 55.5 48C51.9101 48 49 45.3137 49 42C49 38.6863 51.9101 36 55.5 36C59.0899 36 62 38.6863 62 42Z'
						fill='#ED9415'
					/>
				</g>

				{/* Melon */}
				<motion.g animate={melonControls}>
					<path
						d='M32.6715 64.9551C23.9656 64.4074 18.701 59.6539 14.518 51.1992C14.242 50.6413 14.5519 49.9742 15.1531 49.8135L17.4173 49.2081C17.9035 49.0782 18.4082 49.3312 18.6177 49.7888C22.5484 58.3743 31.4387 62.5363 43.3409 58.1089C52.6683 54.6394 54.8666 45.4001 53.689 39.1046C53.5883 38.5661 53.9026 38.0272 54.4318 37.8857L56.6273 37.2987C57.2164 37.1412 57.8093 37.545 57.8622 38.1524C58.9845 51.0458 52.9129 57.0004 51.8764 58.1089C50.8095 59.25 42.8074 65.5927 32.6715 64.9551Z'
						fill='#0F5E28'
					/>
					<g filter='url(#filter6_f_1_102)'>
						<path
							d='M55.0699 39.282C56.7913 45.5349 54.7257 55.5395 44.1682 59.1775C30.9714 63.725 21.2172 59.1775 17.2008 50.0824'
							stroke='#3ECD21'
							strokeOpacity='0.61'
							strokeWidth='1.5'
						/>
					</g>
					<g filter='url(#filter7_d_1_102)'>
						<path
							d='M26.9621 46.9145L19.4626 48.6968C18.846 48.8433 18.5182 49.5199 18.8085 50.0833C21.7064 55.7071 27.7396 62.9575 41.7405 58.6795C53.1855 55.1824 54.8941 44.5242 53.7407 39.1359C53.6227 38.5845 53.0378 38.2975 52.5068 38.4868L49.3398 39.6158C48.9415 39.7578 48.6756 40.1349 48.6756 40.5577V43.6239C48.6756 43.7703 48.6442 43.9146 48.58 44.0461C48.0013 45.2335 46.8144 47.2692 46.0082 47.2692H39.1241C38.7624 47.2692 38.4323 47.4657 38.2383 47.771C37.5843 48.8003 36.4233 50.3057 35.3388 50.6923C34.6654 50.9324 34.0608 50.762 33.5873 50.4636C33.0311 50.1131 32.1301 49.927 31.4831 50.0431C31.2149 50.0912 30.9005 50.1218 30.5376 50.1218C29.5367 50.1218 28.688 48.7272 28.1952 47.5733C27.9888 47.0899 27.4734 46.793 26.9621 46.9145Z'
							fill='url(#paint1_linear_1_102)'
						/>
					</g>
					<g filter='url(#filter8_f_1_102)'>
						<path
							d='M26.8033 51.8333C26.8033 52.4635 26.5644 52.9743 26.2698 52.9743C25.9752 52.9743 25.7364 52.4635 25.7364 51.8333C25.7364 51.2031 25.9752 50.6923 26.2698 50.6923C26.5644 50.6923 26.8033 51.2031 26.8033 51.8333Z'
							fill='#8C2910'
						/>
					</g>
					<g filter='url(#filter9_f_1_102)'>
						<path
							d='M41.6955 55.0069C41.8414 55.561 41.6717 56.0969 41.3166 56.2038C40.9614 56.3107 40.5553 55.9482 40.4094 55.394C40.2636 54.8398 40.4332 54.3039 40.7884 54.197C41.1435 54.0901 41.5497 54.4527 41.6955 55.0069Z'
							fill='#8C2910'
						/>
					</g>
					<g filter='url(#filter10_f_1_102)'>
						<path
							d='M45.5227 50.4406C45.8035 50.9318 45.776 51.4968 45.4612 51.7026C45.1464 51.9084 44.6636 51.6771 44.3828 51.1859C44.102 50.6948 44.1295 50.1298 44.4443 49.9239C44.7591 49.7181 45.2419 49.9494 45.5227 50.4406Z'
							fill='#8C2910'
						/>
					</g>

					{/* Hands */}
					<path
						d='M11.4444 57.2233C11.4444 57.2233 10.4444 54.2233 11.4444 52.7233C12.4444 51.2233 14.6964 52.3913 15.9444 53.2233C17.4444 54.2233 20.9444 58.2233 21.4444 59.7233C21.9444 61.2233 22.4444 63.2233 17.9444 63.7233C14.3444 64.1233 12.1111 59.5567 11.4444 57.2233Z'
						fill='url(#paint2_linear_1_102)'
						stroke='#B77214'
					/>
					<g filter='url(#filter11_f_1_102)'>
						<path
							d='M18.0097 60.2035C18.7526 61.021 18.8577 62.1353 18.2446 62.6925C17.6315 63.2496 16.5323 63.0385 15.7894 62.221C15.0466 61.4035 14.9415 60.2892 15.5546 59.7321C16.1677 59.1749 17.2669 59.386 18.0097 60.2035Z'
							fill='#FAE8B4'
						/>
					</g>
					<path
						d='M59.3162 53.2233C59.3162 53.2233 60.3162 50.2233 59.3162 48.7233C58.3162 47.2233 56.0643 48.3913 54.8162 49.2233C53.3162 50.2233 49.8162 54.2233 49.3162 55.7233C48.8162 57.2233 48.3162 59.2233 52.8162 59.7233C56.4162 60.1233 58.6496 55.5567 59.3162 53.2233Z'
						fill='url(#paint3_linear_1_102)'
						stroke='#B77214'
					/>
					<g filter='url(#filter12_f_1_102)'>
						<path
							d='M52.7509 56.2035C52.0081 57.021 51.903 58.1353 52.5161 58.6925C53.1292 59.2496 54.2284 59.0385 54.9712 58.221C55.7141 57.4035 55.8192 56.2892 55.2061 55.7321C54.593 55.1749 53.4938 55.386 52.7509 56.2035Z'
							fill='#FAE8B4'
						/>
					</g>
				</motion.g>

				<defs>
					<filter id='filter0_ii_1_102' x='2' y='0' width='64' height='64' filterUnits='userSpaceOnUse' colorInterpolationFilters='sRGB'>
						<feFlood floodOpacity='0' result='BackgroundImageFix' />
						<feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
						<feColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha' />
						<feMorphology radius='2' operator='erode' in='SourceAlpha' result='effect1_innerShadow_1_102' />
						<feOffset dx='2' dy='-2' />
						<feGaussianBlur stdDeviation='2' />
						<feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
						<feColorMatrix type='matrix' values='0 0 0 0 0.898039 0 0 0 0 0.584314 0 0 0 0 0.211765 0 0 0 1 0' />
						<feBlend mode='normal' in2='shape' result='effect1_innerShadow_1_102' />
						<feColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha' />
						<feOffset />
						<feGaussianBlur stdDeviation='2' />
						<feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
						<feColorMatrix type='matrix' values='0 0 0 0 0.898039 0 0 0 0 0.584314 0 0 0 0 0.211765 0 0 0 1 0' />
						<feBlend mode='normal' in2='effect1_innerShadow_1_102' result='effect2_innerShadow_1_102' />
					</filter>
					<filter id='filter1_f_1_102' x='0.90625' y='0.90625' width='64.1875' height='64.1875' filterUnits='userSpaceOnUse' colorInterpolationFilters='sRGB'>
						<feFlood floodOpacity='0' result='BackgroundImageFix' />
						<feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
						<feGaussianBlur stdDeviation='2' result='effect1_foregroundBlur_1_102' />
					</filter>
					<filter id='filter2_i_1_102' x='8.5' y='24.5' width='23' height='9' filterUnits='userSpaceOnUse' colorInterpolationFilters='sRGB'>
						<feFlood floodOpacity='0' result='BackgroundImageFix' />
						<feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
						<feColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha' />
						<feOffset />
						<feGaussianBlur stdDeviation='1.5' />
						<feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
						<feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0' />
						<feBlend mode='normal' in2='shape' result='effect1_innerShadow_1_102' />
					</filter>
					<filter id='filter3_i_1_102' x='36.5' y='24.5' width='23' height='9' filterUnits='userSpaceOnUse' colorInterpolationFilters='sRGB'>
						<feFlood floodOpacity='0' result='BackgroundImageFix' />
						<feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
						<feColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha' />
						<feOffset />
						<feGaussianBlur stdDeviation='1.5' />
						<feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
						<feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0' />
						<feBlend mode='normal' in2='shape' result='effect1_innerShadow_1_102' />
					</filter>
					<filter id='filter4_f_1_102' x='3' y='33' width='21' height='21' filterUnits='userSpaceOnUse' colorInterpolationFilters='sRGB'>
						<feFlood floodOpacity='0' result='BackgroundImageFix' />
						<feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
						<feGaussianBlur stdDeviation='2' result='effect1_foregroundBlur_1_102' />
					</filter>
					<filter id='filter5_f_1_102' x='45' y='32' width='21' height='20' filterUnits='userSpaceOnUse' colorInterpolationFilters='sRGB'>
						<feFlood floodOpacity='0' result='BackgroundImageFix' />
						<feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
						<feGaussianBlur stdDeviation='2' result='effect1_foregroundBlur_1_102' />
					</filter>
					<filter id='filter6_f_1_102' x='14.5147' y='37.083' width='43.8436' height='26.6285' filterUnits='userSpaceOnUse' colorInterpolationFilters='sRGB'>
						<feFlood floodOpacity='0' result='BackgroundImageFix' />
						<feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
						<feGaussianBlur stdDeviation='1' result='effect1_foregroundBlur_1_102' />
					</filter>
					<filter id='filter7_d_1_102' x='14.7015' y='38.4286' width='43.3456' height='29.5426' filterUnits='userSpaceOnUse' colorInterpolationFilters='sRGB'>
						<feFlood floodOpacity='0' result='BackgroundImageFix' />
						<feColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha' />
						<feOffset dy='4' />
						<feGaussianBlur stdDeviation='2' />
						<feComposite in2='hardAlpha' operator='out' />
						<feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
						<feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_1_102' />
						<feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_1_102' result='shape' />
					</filter>
					<filter id='filter8_f_1_102' x='25.2364' y='50.1923' width='2.06694' height='3.28204' filterUnits='userSpaceOnUse' colorInterpolationFilters='sRGB'>
						<feFlood floodOpacity='0' result='BackgroundImageFix' />
						<feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
						<feGaussianBlur stdDeviation='0.25' result='effect1_foregroundBlur_1_102' />
					</filter>
					<filter id='filter9_f_1_102' x='39.8571' y='53.6783' width='2.39071' height='3.04417' filterUnits='userSpaceOnUse' colorInterpolationFilters='sRGB'>
						<feFlood floodOpacity='0' result='BackgroundImageFix' />
						<feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
						<feGaussianBlur stdDeviation='0.25' result='effect1_foregroundBlur_1_102' />
					</filter>
					<filter id='filter10_f_1_102' x='43.689' y='49.3488' width='2.52758' height='2.92902' filterUnits='userSpaceOnUse' colorInterpolationFilters='sRGB'>
						<feFlood floodOpacity='0' result='BackgroundImageFix' />
						<feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
						<feGaussianBlur stdDeviation='0.25' result='effect1_foregroundBlur_1_102' />
					</filter>
					<filter id='filter11_f_1_102' x='13.1556' y='57.4208' width='7.48804' height='7.58284' filterUnits='userSpaceOnUse' colorInterpolationFilters='sRGB'>
						<feFlood floodOpacity='0' result='BackgroundImageFix' />
						<feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
						<feGaussianBlur stdDeviation='1' result='effect1_foregroundBlur_1_102' />
					</filter>
					<filter id='filter12_f_1_102' x='50.1171' y='53.4208' width='7.48804' height='7.58284' filterUnits='userSpaceOnUse' colorInterpolationFilters='sRGB'>
						<feFlood floodOpacity='0' result='BackgroundImageFix' />
						<feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
						<feGaussianBlur stdDeviation='1' result='effect1_foregroundBlur_1_102' />
					</filter>
					<linearGradient id='paint0_linear_1_102' x1='32.0313' y1='4.42188' x2='32.0313' y2='60.6094' gradientUnits='userSpaceOnUse'>
						<stop stopColor='#FEFFEC' />
						<stop offset='0.432692' stopColor='#FBF358' />
						<stop offset='1' stopColor='#ED9213' />
					</linearGradient>
					<linearGradient id='paint1_linear_1_102' x1='35.3388' y1='46.1282' x2='36.0107' y2='59.9153' gradientUnits='userSpaceOnUse'>
						<stop stopColor='#DC4D1C' />
						<stop offset='1' stopColor='#C92000' />
					</linearGradient>
					<linearGradient id='paint2_linear_1_102' x1='14.9444' y1='54.7233' x2='18.4444' y2='62.7233' gradientUnits='userSpaceOnUse'>
						<stop stopColor='#EFBE3D' />
						<stop offset='1' stopColor='#E9AA36' />
					</linearGradient>
					<linearGradient id='paint3_linear_1_102' x1='55.8162' y1='50.7233' x2='52.3162' y2='58.7233' gradientUnits='userSpaceOnUse'>
						<stop stopColor='#EFBE3D' />
						<stop offset='1' stopColor='#E9AA36' />
					</linearGradient>
				</defs>
			</svg>
		</div>
	)
}
