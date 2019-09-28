import { IFeatureSettingsDto } from './types'
import { IFeatureSettings } from '../app/types'

export function createFeatureSettingsList(dto: IFeatureSettingsDto[]): IFeatureSettings[] {
    return dto.map(x => ({
        color: x.color,
        createdBy: x.created_by,
        createdOn: new Date(x.created_on),
        fieldTarget: x.field_target,
        fieldValue: x.field_value,
        id: x.id,
    }))
}
