import {NgModule} from '@angular/core';
import {NZ_ICONS, NzIconModule} from 'ng-zorro-antd/icon';

import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  FormOutline,
  DashboardOutline,
  DatabaseOutline,
  SettingOutline,
  PlusOutline,
  MinusCircleOutline
} from '@ant-design/icons-angular/icons';

const icons = [
  MenuFoldOutline,
  MenuUnfoldOutline,
  DashboardOutline,
  FormOutline,
  DatabaseOutline,
  SettingOutline,
  PlusOutline,
  MinusCircleOutline
];

@NgModule({
  imports: [NzIconModule],
  exports: [NzIconModule],
  providers: [{provide: NZ_ICONS, useValue: icons}],
})
export class IconsProviderModule {
}
