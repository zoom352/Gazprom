import { Table, TableColumnsType } from "antd"
import { IItems } from "../../models/IItems"
import { TableRowSelection } from "../../App"
import { FC, memo } from "react"

interface ICommonTable {
  rowSelection: TableRowSelection<IItems>;
  columns: TableColumnsType<IItems>;
  dataSource: IItems[];
  loading: boolean;
  count_quantity: number
}

const CommonTable: FC<ICommonTable> = memo((props) => {
    const {
      rowSelection,
      columns,
      dataSource,
      loading,
      count_quantity
    } = props

    return (
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        // pagination={false}
        summary={() => (
          <Table.Summary.Row>
            <Table.Summary.Cell index={0}></Table.Summary.Cell>
            <Table.Summary.Cell index={1} />
            <Table.Summary.Cell index={2} />
            <Table.Summary.Cell index={3} />
            <Table.Summary.Cell index={4} />
            <Table.Summary.Cell index={5}>
              <span>{count_quantity}</span>
            </Table.Summary.Cell>
          </Table.Summary.Row>
        )}
      />
    )
})

export default CommonTable;
