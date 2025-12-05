import type { FormEvent, MouseEvent } from 'react';
import clsx from 'clsx';

import { ArrowButton } from '../../ui/arrow-button';
import { Button } from '../../ui/button';
import { Select } from '../../ui/select';
import { Text } from '../../ui/text';

import {
	type ArticleStateType,
	type OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	/** Открыт ли сайдбар */
	isOpen: boolean;
	/** Клик по стрелке (открыть/закрыть) */
	onToggle: () => void;
	/** Закрыть при клике вне панели */
	onClose: () => void;
	/** Состояние формы (черновик) */
	state: ArticleStateType;
	/** Обновление состояния формы */
	onChange: (next: ArticleStateType) => void;
	/** Применить настройки */
	onApply: () => void;
	/** Сбросить настройки к начальному состоянию */
	onReset: () => void;
};

export const ArticleParamsForm = ({
	isOpen,
	onToggle,
	onClose,
	state,
	onChange,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	// клик по подложке — закрыть сайдбар
	const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
		if (event.target === event.currentTarget) {
			onClose();
		}
	};

	// сабмит формы = "Применить"
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply();
	};

	const handleResetClick = () => {
		onReset();
	};

	// маленький хелпер: меняем одно поле в state формы
	const handleFieldChange =
		(field: keyof ArticleStateType) => (option: OptionType) => {
			onChange({
				...state,
				[field]: option,
			});
		};

	return (
		<>
			{/* Стрелка, которая открывает/закрывает панель */}
			<ArrowButton isOpen={isOpen} onClick={onToggle} />

			{/* Подложка + панель с формой */}
			{isOpen && (
				<div className={styles.overlay} onClick={handleOverlayClick}>
					<aside
						className={clsx(styles.container, {
							[styles.container_open]: isOpen,
						})}>
						<form className={styles.form} onSubmit={handleSubmit}>
							<Text as='h2' size={31} weight={800} dynamicLite>
								Выбор стилей
							</Text>

							<Select
								title='Шрифт'
								selected={state.fontFamilyOption}
								options={fontFamilyOptions}
								onChange={handleFieldChange('fontFamilyOption')}
							/>

							<Select
								title='Цвет шрифта'
								selected={state.fontColor}
								options={fontColors}
								onChange={handleFieldChange('fontColor')}
							/>

							<Select
								title='Цвет фона'
								selected={state.backgroundColor}
								options={backgroundColors}
								onChange={handleFieldChange('backgroundColor')}
							/>

							<Select
								title='Ширина контента'
								selected={state.contentWidth}
								options={contentWidthArr}
								onChange={handleFieldChange('contentWidth')}
							/>

							<Select
								title='Размер шрифта'
								selected={state.fontSizeOption}
								options={fontSizeOptions}
								onChange={handleFieldChange('fontSizeOption')}
							/>

							<div className={styles.bottomContainer}>
								<Button
									type='clear'
									title='Сбросить'
									htmlType='button'
									onClick={handleResetClick}
								/>
								<Button type='apply' title='Применить' htmlType='submit' />
							</div>
						</form>
					</aside>
				</div>
			)}
		</>
	);
};
