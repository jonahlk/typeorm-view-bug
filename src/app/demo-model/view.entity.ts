import {ViewColumn, ViewEntity} from 'typeorm';


@ViewEntity({
  expression: `
      SELECT
          DEO.id                  AS id,
          DEO.property            AS property,
          DET.some_other_property AS some_other_property,
          NULL                    AS new_column
      FROM
          demo_entity_one DEO
              LEFT JOIN
              demo_entity_two DET ON DET.demo_entity_one_id = DEO.id
  `,
})
export class DemoViewEntity {
  @ViewColumn({name: 'id'})
  id: number;

  @ViewColumn({name: 'id'})
  property: string;

  @ViewColumn({name: 'id'})
  someOtherProperty: string;

}