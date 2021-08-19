import {ViewColumn, ViewEntity} from 'typeorm';


@ViewEntity({
  expression: `
      SELECT *,
             NULL AS some_other_column
      FROM
          demo_view_entity
  `,
})
export class DemoViewEntityChild {
  @ViewColumn({name: 'id'})
  id: number;

  @ViewColumn({name: 'property'})
  property: string;

  @ViewColumn({name: 'some_other_property'})
  someOtherProperty: string;

  @ViewColumn({name: 'some_other_column'})
  someOtherColumn: null;
}