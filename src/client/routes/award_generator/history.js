import React from 'react';
import MUIDataTable from 'mui-datatables';

const columns = ['Name', 'Email', 'Award'];

export default ({award_history}) => {
  const data = award_history.map(history_winner => {
    return ([`${history_winner.registrant.name.firstName} ${history_winner.registrant.name.lastName}`, history_winner.registrant.email, history_winner.item])
  });
  return (
    <MUIDataTable
      title={'Previous Winners'}
      data={data}
      columns={columns}
      options={{filterType: 'checkbox'}}
    />
  )
}