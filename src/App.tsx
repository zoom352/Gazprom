import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchItems, fetchItems2, fetchItemsDelete, fetchItemsDelete2 } from './store/reducers/ActionCreators';
import { Button, Table, TableColumnsType, TableProps } from 'antd';
import { IItems } from './models/IItems';
import Modal from './components/modal';
import { itemsSlice } from './store/reducers/ItemsSlice';
import { ButtonCommonDiv, MainDiv } from './style';
import CommonTable from './components/table';

export type TableRowSelection<T> = TableProps<T>["rowSelection"];

const columns: TableColumnsType<IItems> = [
  {
    title: 'name',
    dataIndex: "name",
  },
  {
    title: "deliveryDate",
    dataIndex: "deliveryDate"
  },
  {
    title: "price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "currency",
    dataIndex: "currency"
  },
  {
    title: 'quantity',
    dataIndex: "quantity"
  },
];


function App() {
  const dispatch = useAppDispatch()
  const [active, setActive] = useState(false)
  const items = useAppSelector(state => state.itemsSlice)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [state, setState] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchItems());
      await dispatch(fetchItems2());
    };

    fetchData();
  }, [dispatch])
  

  const onSelectChange = useCallback((newSelectedRowKeys: React.Key[], selectedRows: any) => {
    setState(selectedRows);
    setSelectedRowKeys(newSelectedRowKeys);
  }, []);

  const rowSelection: TableRowSelection<IItems> = useMemo(() => ({
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  }), [onSelectChange, selectedRowKeys]);

  const deleteItems = useCallback(async () => {
    try {
      const promises = selectedRowKeys.map(async key => {
        await dispatch(fetchItemsDelete(key.toString()));
        await dispatch(fetchItemsDelete2(key.toString()));
      });

      await Promise.allSettled(promises);
      dispatch(itemsSlice.actions.countQuantity());
      setSelectedRowKeys([]);
      setState([]);
      setActive(false);
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  }, [dispatch, selectedRowKeys]);

  return (
    <MainDiv>
      {active ? <Modal
        active={active}
        setActive={setActive}
      >
        {state.map((item: any) => {
          return (
            <span>{item.name}, </span>
          )
        })}
        <ButtonCommonDiv>
          <Button
            style={{color: 'green'}}
            onClick={deleteItems}>
            Применить
          </Button>
          <Button
            style={{color: 'red'}}
            onClick={() => setActive(false)}>
            Отклонить
          </Button>
        </ButtonCommonDiv>
      </Modal> : null}
      <Button
        disabled={selectedRowKeys.length ? false : true}
        onClick={() => setActive(true)}
      >
        Анулировать
      </Button>
      <CommonTable
        rowSelection={rowSelection}
        columns={columns}
        dataSource={items.items}
        loading={items.isLoading}
        count_quantity={items.count_quantity}
      />
    </MainDiv>
  );
}

export default App;
