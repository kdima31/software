/**
 *
 * ProductFilter
 *
 */

import React, { useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

import RangeSlider from '../../Common/RangeSlider';
import { API_URL } from '../../../constants';

const priceMarks = {
	1: { label: <p className='fw-normal text-black'>$1</p> },
	5000: { label: <p className='fw-normal text-black'>$5000</p> },
};

const rateMarks = {
	0: {
		label: (
			<span>
				<span className='mr-1'>5</span>
				<i
					className='fa fa-star fa-1x'
					style={{ display: 'contents' }}
					aria-hidden='true'></i>
			</span>
		),
	},
	20: {
		label: (
			<span>
				<span className='mr-1'>4</span>
				<i className='fa fa-star fa-1x' aria-hidden='true'></i>
			</span>
		),
	},
	40: {
		label: (
			<span>
				<span className='mr-1'>3</span>
				<i className='fa fa-star fa-1x' aria-hidden='true'></i>
			</span>
		),
	},
	60: {
		label: (
			<span>
				<span className='mr-1'>2</span>
				<i className='fa fa-star fa-1x' aria-hidden='true'></i>
			</span>
		),
	},
	80: {
		label: (
			<span>
				<span className='mr-1'>1</span>
				<i className='fa fa-star fa-1x' aria-hidden='true'></i>
			</span>
		),
	},
	100: { label: <span>Any</span> },
};

const rating = (v) => {
	switch (v) {
		case 100:
			return 0;
		case 80:
			return 1;
		case 60:
			return 2;
		case 40:
			return 3;
		case 20:
			return 4;
		default:
			0;
			return 5;
	}
};

const SkinType = [
	{
		name: 'dry',
	},
	{
		name: 'oily',
	},
	{
		name: 'normal',
	},
	{
		name: 'sensitive',
	},
];

const clearFilter = () => {
	const allRadioButtons = document.querySelectorAll('input[type="radio"]');

	for (const radioButton of allRadioButtons) {
		if (radioButton.checked) {
			radioButton.checked = false; // Uncheck if already checked
		}
	}
};

const ProductFilter = (props) => {
	const { filterProducts } = props;

	const myskinfilter = async (e) => {
		try {
			const response = await fetch(
				`${API_URL}/list/product/skinType/:${encodedSkinType}`
			);

			if (!response.ok) {
				throw new Error(`API request failed with status ${response.status}`);
			}

			const data = await response.json();

			return data;
		} catch (error) {
			console.error('Error fetching skin-filtered products:', error);
		}
	};
	return (
		<div className='product-filter'>
			<Card className='mb-4'>
				<CardHeader tag='h3'>Price</CardHeader>
				<CardBody>
					<div className='mx-2 mb-3'>
						<RangeSlider
							marks={priceMarks}
							defaultValue={[1, 2500]}
							max={5000}
							onChange={(v) => {
								filterProducts('price', v);
							}}
						/>
					</div>
				</CardBody>
			</Card>
			<Card className='mb-4'>
				<CardHeader tag='h3'>Rating</CardHeader>
				<CardBody>
					<div className='mx-2 mb-4'>
						<RangeSlider
							type='slider'
							marks={rateMarks}
							step={20}
							defaultValue={[100]}
							onChange={(v) => {
								filterProducts('rating', rating(v));
							}}
						/>
					</div>
				</CardBody>
			</Card>
			<Card className='mb-4'>
				<CardHeader tag='h3'>Skin Type</CardHeader>
				<CardBody>
					<div className='mx-2 mb-3'>
						{/* TODO: Skin type */}
						<div className='container' style={containerStyle}>
							<div className='' style={divStyle}>
								<input
									type='radio'
									name='radios'
									value='dry'
									onChange={(v) => {
										filterProducts('skinType', v);
									}}
								/>
								<label style={lblStyle}>Dry</label>
								<br />
							</div>
							<div className='' style={divStyle}>
								<input type='radio' name='radios' value='oily' />
								<label style={lblStyle}>Oily</label>
								<br />
							</div>
							<div className='' style={divStyle}>
								<input type='radio' name='radios' value='normal' />
								<label style={lblStyle}>Normal</label>
								<br />
							</div>
							<div className='' style={divStyle}>
								<input type='radio' name='radios' value='sensitive' />
								<label style={lblStyle}>Sensitive</label>
								<br />
							</div>
							<div className='clear'>
								<button
									className='clearBtn'
									style={btnStyle}
									onClick={() => clearFilter()}>
									clear filter
								</button>
							</div>
						</div>
					</div>
				</CardBody>
			</Card>
		</div>
	);
};

const containerStyle = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-start',
};

const divStyle = {
	display: 'flex',
	justifyContent: 'center',
};

const lblStyle = {
	fontWeight: '500',
	marginLeft: '10px',
};

const btnStyle = {
	marginTop: '10px',
	borderRadius: '3px',
	border: '1px solid #323232',
};

export default ProductFilter;
