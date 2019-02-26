export class CodeTable {
  dataTypeOptions = [
    {name: 'String', type: 'String'},
    {name: 'Number', type: 'Number'},
    {name: 'Datetime', type: 'Datetime'},
    {name: 'Master Date', type: 'Master Date'}
  ];
  dbFieldOptions = [
    {name: 'number01', type: 'number01'},
    {name: 'number02', type: 'number02'},
    {name: 'number03', type: 'number03'},
    {name: 'number04', type: 'number04'},
    {name: 'number05', type: 'number05'},
    {name: 'number06', type: 'number06'},
    {name: 'number07', type: 'number07'},
    {name: 'number08', type: 'number08'},
    {name: 'number09', type: 'number09'},
    {name: 'number10', type: 'number10'},
    {name: 'number11', type: 'number11'},
    {name: 'number12', type: 'number12'},
    {name: 'number13', type: 'number13'},
    {name: 'number14', type: 'number14'},
    {name: 'number15', type: 'number15'},
    {name: 'number16', type: 'number16'},
    {name: 'number17', type: 'number17'},
    {name: 'number18', type: 'number18'},
    {name: 'number19', type: 'number19'},
    {name: 'number20', type: 'number20'},
    {name: 'number21', type: 'number21'},
    {name: 'number22', type: 'number22'},
    {name: 'number23', type: 'number23'},
    {name: 'number24', type: 'number24'},
    {name: 'number25', type: 'number25'},
    {name: 'number26', type: 'number26'},
    {name: 'number27', type: 'number27'},
    {name: 'number28', type: 'number28'},
    {name: 'number29', type: 'number29'},
    {name: 'number30', type: 'number30'},
    {name: 'number31', type: 'number31'},
    {name: 'number32', type: 'number32'},
    {name: 'number33', type: 'number33'},
    {name: 'number34', type: 'number34'},
    {name: 'number35', type: 'number35'},
    {name: 'number36', type: 'number36'},
    {name: 'number37', type: 'number37'},
    {name: 'number38', type: 'number38'},
    {name: 'number39', type: 'number39'},
    {name: 'number40', type: 'number40'},
    {name: 'number41', type: 'number41'},
    {name: 'number42', type: 'number42'},
    {name: 'number43', type: 'number43'},
    {name: 'number44', type: 'number44'},
    {name: 'number45', type: 'number45'},
    {name: 'number46', type: 'number46'},
    {name: 'number47', type: 'number47'},
    {name: 'number48', type: 'number48'},
    {name: 'number49', type: 'number49'},
    {name: 'number50', type: 'number50'},
    {name: 'string01', type: 'string01'},
    {name: 'string02', type: 'string02'},
    {name: 'string03', type: 'string03'},
    {name: 'string04', type: 'string04'},
    {name: 'string05', type: 'string05'},
    {name: 'string06', type: 'string06'},
    {name: 'string07', type: 'string07'},
    {name: 'string08', type: 'string08'},
    {name: 'string09', type: 'string09'},
    {name: 'string10', type: 'string10'},
    {name: 'string11', type: 'string11'},
    {name: 'string12', type: 'string12'},
    {name: 'string13', type: 'string13'},
    {name: 'string14', type: 'string14'},
    {name: 'string15', type: 'string15'},
    {name: 'string16', type: 'string16'},
    {name: 'string17', type: 'string17'},
    {name: 'string18', type: 'string18'},
    {name: 'string19', type: 'string19'},
    {name: 'string20', type: 'string20'},
    {name: 'string21', type: 'string21'},
    {name: 'string22', type: 'string22'},
    {name: 'string23', type: 'string23'},
    {name: 'string24', type: 'string24'},
    {name: 'string25', type: 'string25'},
    {name: 'string26', type: 'string26'},
    {name: 'string27', type: 'string27'},
    {name: 'string28', type: 'string28'},
    {name: 'string29', type: 'string29'},
    {name: 'string30', type: 'string30'},
    {name: 'string31', type: 'string31'},
    {name: 'string32', type: 'string32'},
    {name: 'string33', type: 'string33'},
    {name: 'string34', type: 'string34'},
    {name: 'string35', type: 'string35'},
    {name: 'string36', type: 'string36'},
    {name: 'string37', type: 'string37'},
    {name: 'string38', type: 'string38'},
    {name: 'string39', type: 'string39'},
    {name: 'string40', type: 'string40'},
    {name: 'string41', type: 'string41'},
    {name: 'string42', type: 'string42'},
    {name: 'string43', type: 'string43'},
    {name: 'string44', type: 'string44'},
    {name: 'string45', type: 'string45'},
    {name: 'string46', type: 'string46'},
    {name: 'string47', type: 'string47'},
    {name: 'string48', type: 'string48'},
    {name: 'string49', type: 'string49'},
    {name: 'string50', type: 'string50'}
  ];
  getOptionNameByKey(array, type: any) {
    const options = array;
    let item;
    options.forEach(function(op , index) {
      if (op.type === type) {
        item = op.name;
      }
    });
    return item;
  }

  getOptionItem(array, type: any) {
    const options = array;
    let item;
    options.forEach(function(op , index) {
      if (op.type === type) {
        item = op;
      }
    });
    return item;
  }
}
