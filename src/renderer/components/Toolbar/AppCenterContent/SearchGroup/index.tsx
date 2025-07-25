import React, { useState, useEffect } from 'react';
import { useDebounceFn, useRequest } from 'ahooks';
import clsx from 'clsx';
import StockSearch from '@/components/Toolbar/AppCenterContent/StockSearch';
import ZindexSearch from '@/components/Toolbar/AppCenterContent/ZindexSearch';
import FundSearch from '@/components/Toolbar/AppCenterContent/FundSearch';
import RecentSearch from '@/components/Toolbar/AppCenterContent/RecentSearch';
import * as Services from '@/services';
import styles from './index.module.css';

interface SearchGroupProps {
  keyword: string;
}

const SearchGroup: React.FC<SearchGroupProps> = React.memo((props) => {
  const { keyword } = props;
  const [groupList, setGroupList] = useState<Stock.SearchResult[]>([]);
  const { run: runSearch } = useRequest(Services.Stock.SearchFromEastmoney, {
    manual: true,
    ready: !!keyword,
    onSuccess: setGroupList,
    debounceWait: 500,
  });

  const { run: onSearch } = useDebounceFn(runSearch);

  useEffect(() => {
    const value = keyword.trim();
    if (!value) {
      setGroupList([]);
    } else {
      onSearch(value);
    }
  }, [keyword]);

  return (
    <div className={clsx(styles.content)}>
      <RecentSearch keyword={keyword} />
      <FundSearch groupList={groupList} />
      <StockSearch groupList={groupList} />
      <ZindexSearch groupList={groupList} />
    </div>
  );
});

export default SearchGroup;
