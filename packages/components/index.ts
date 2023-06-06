export * from './icon'

import BaseTable from './BaseTable'
import GNoTask from './GNoTask'
import GIcon from './GIcon'
import GSelect from './GSelect'
import GPageTable from './GPageTable'
import { usePageTable } from './GPageTable'
import GSearchBar from './GSearchBar'
import PageHeaderNew from './PageHeaderNew'
import PageTableTabPane from './PageTableTabPane'
import PageTableTabs from './PageTableTabs'

export type { BaseTableProps } from './BaseTable'
export type { PageHeaderProps, SearchButtonOptionsType, SearchOptionsType, PageTableProps } from './GPageTable';

const components = [BaseTable, GNoTask, GIcon, GSelect, GPageTable, usePageTable, GSearchBar, PageHeaderNew, PageTableTabPane, PageTableTabs]

export {
	BaseTable,
	GNoTask,
	GIcon,
	GSelect,
	GPageTable,
	usePageTable,
	GSearchBar,
	PageHeaderNew,
	PageTableTabPane,
	PageTableTabs,
}

export default components 