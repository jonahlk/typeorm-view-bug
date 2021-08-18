import {DefaultNamingStrategy, NamingStrategyInterface} from 'typeorm';
import {snakeCase}                                      from 'typeorm/util/StringUtils';


/**
 * Custom naming functions to match the knex / loopback constraint names
 */
export class CustomNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  columnName(propertyName: string, customName: string, embeddedPrefixes: string[]) {
    return customName || snakeCase(propertyName);
  }

}