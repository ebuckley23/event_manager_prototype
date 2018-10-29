import React from 'react';
import MUIDataTable from 'mui-datatables';

const columns = ['Name', 'Email', 'Award'];
const data = [
  ['Emmanuel Buckley', 'ebuckley2389@gmail.com', 'Test Item']
]
export default () => {
  return (
    <MUIDataTable
      title={'Previous Winners'}
      data={data}
      columns={columns}
      options={{filterType: 'checkbox'}}
    />
  )
}