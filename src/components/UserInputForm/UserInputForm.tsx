import React from 'react';
import { UserInputFormProps } from './UserInputForm.props';
import styled from 'styled-components';
import { FieldValues, useForm } from "react-hook-form";
import { SaveButton } from '../SaveButton/SaveButton';

const Form = styled.form`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 10px;
`;

const genderSelectOptions = [
	{ value: 'male', Label: 'Male' },
	{ value: 'female', Label: 'Female' },
];

const eyeColorSelectOptions = [
	{ value: 'brown', Label: 'Brown' },
	{ value: 'blue', Label: 'Blue' },
	{ value: 'hazel', Label: 'Hazel' },
	{ value: 'amber', Label: 'Amber' },
	{ value: 'gray', Label: 'Gray' },
	{ value: 'green', Label: 'Green' },
];

export const Input = styled.input<any>`
  width: 70%;
	&:not([type='checkbox']) {
    height: 30px;
    border: none;
    outline: none;
    box-sizing: border-box;
    padding: 10px;
    box-shadow: 0 4px 4px 2px rgba(0, 0, 0, .1);
    &:focus {
      transform: scale(1.08);
    }
    &::placeholder {
      color: rgba(119, 116, 116, 0.4);
    }
	}
`;

const Label = styled.label`
	width: 100%;
	display: flex;
	justify-content: space-between;
  font-size: 14px;
  color: rgba(119, 116, 116, 0.99);
`;

const Select = styled.select`
	width: 70%;
	outline: none;
  border:0;
  box-shadow: 0 4px 4px 2px rgba(0, 0, 0, .1);
`;

export const UserInputForm = ({ user, saveForm }: UserInputFormProps) => {
	const { register, handleSubmit } = useForm({
		defaultValues: user,
	});

	const handleFormSubmit = (fieldValues: FieldValues) => {
		saveForm(fieldValues);
	}

	return (
		<>
			<Form onSubmit={handleSubmit((data) => handleFormSubmit(data))}>
				<Label>
					Name
					<Input {...register('name')} />
				</Label>
				<Label>
					Balance ($)
					<Input {...register('balance')} />
				</Label>
				<Label>
					Age
					<Input {...register('age')} type='number' />
				</Label>

				<Label>
					Eye Color
					<Select {...register('eyeColor')} defaultValue={eyeColorSelectOptions[0].value}>
						{ eyeColorSelectOptions.map((opt, i) =>
							<option key={opt.value} value={opt.value}>{opt.Label}</option>)
						}
					</Select>
				</Label>
				<Label>
					Gender
					<Select {...register('gender')} defaultValue={genderSelectOptions[0].value}>
						{ genderSelectOptions.map((opt, i) =>
							<option key={opt.value} value={opt.value}>{opt.Label}</option>)
						}
					</Select>
				</Label>
				<Label>
					Company
					<Input {...register('company')} />
				</Label>
				<Label>
					Email
					<Input {...register('email')} type='email' />
				</Label>
				<Label>
					Phone
					<Input {...register('phone')} />
				</Label>
				<Label>
					Address
					<Input {...register('address')} />
				</Label>
				<Label>
					Is Active
					<Input {...register('isActive')} type='checkbox' />
				</Label>
			</Form>
			<SaveButton onClick={handleSubmit((data) => handleFormSubmit(data))} />
		</>
	);
};
