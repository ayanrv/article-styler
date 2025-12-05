import arrow from '../../images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type ArrowButtonProps = {
	isOpen: boolean;
	onClick: OnClick;
};

export const ArrowButton = ({ isOpen, onClick }: ArrowButtonProps) => {
	return (
		<button
			type='button'
			className={clsx(styles.container, {
				[styles.container_open]: isOpen,
			})}
			onClick={onClick}
			role='button'
			aria-label={
				isOpen ? 'Закрыть панель настроек' : 'Открыть панель настроек'
			}>
			<img
				src={arrow}
				alt=''
				className={clsx(styles.arrow, {
					[styles.arrow_open]: isOpen,
				})}
			/>
		</button>
	);
};
