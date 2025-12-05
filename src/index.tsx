import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	type ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	// Состояние примененных настроек статьи
	const [pageState, setPageState] =
		useState<ArticleStateType>(defaultArticleState);
	// Состояние формы (черновик)
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	// Открыт ли сайдбар
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	// Открыть/закрыть по стрелке
	const handleToggleSidebar = () => {
		setIsSidebarOpen((prev) => !prev);
	};

	// Закрыть при клике вне панели
	const handleCloseSidebar = () => {
		setIsSidebarOpen(false);
	};

	// Обновление черновика формы (форма управляемая)
	const handleFormChange = (nextState: ArticleStateType) => {
		setFormState(nextState);
	};

	// "Применить" - копируем formState -> pageState
	const handleApply = () => {
		setPageState(formState);
		setIsSidebarOpen(false);
	};

	// "Сбросить" - откатываем и форму, и страницу к дефолту
	const handleReset = () => {
		setPageState(defaultArticleState);
		setFormState(defaultArticleState);
		setIsSidebarOpen(false);
	};

	// CSS-переменные, которые влияют на внешний вид
	const cssVars: CSSProperties = {
		'--bg-color': pageState.backgroundColor.value,
		'--font-color': pageState.fontColor.value,
		'--font-family': pageState.fontFamilyOption.value,
		'--font-size': pageState.fontSizeOption.value,
		'--container-width': pageState.contentWidth.value,
	} as CSSProperties;

	return (
		<div className={clsx(styles.main)} style={cssVars}>
			<Article />
			<ArticleParamsForm
				isOpen={isSidebarOpen}
				onToggle={handleToggleSidebar}
				onClose={handleCloseSidebar}
				state={formState}
				onChange={handleFormChange}
				onApply={handleApply}
				onReset={handleReset}
			/>
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
