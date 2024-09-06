import { ButtonMobile } from '@alfalab/core-components/button/mobile';
import { Collapse } from '@alfalab/core-components/collapse';
import { Gap } from '@alfalab/core-components/gap';
import { PopupSheet } from '@alfalab/core-components/popup-sheet';
import { Switch } from '@alfalab/core-components/switch';
import { Typography } from '@alfalab/core-components/typography';
import { useCallback, useState } from 'react';
import pfmMain from './assets/pfm_main.png';
import { LS, LSKeys } from './ls';
import { appSt } from './style.css';
import { ThxLayout } from './thx/ThxLayout';
import { sendDataToGA } from './utils/events';

export const App = () => {
  const [checkedItems, setChecked] = useState<{ id: number; checked: boolean }[]>([]);
  const [loading, setLoading] = useState(false);
  const [warnOpen, showWarn] = useState(false);
  const [thxShow, setThx] = useState(LS.getItem(LSKeys.ShowThx, false));

  const submit = useCallback(() => {
    setLoading(true);
    sendDataToGA({
      categories: Number(checkedItems.some(c => c.checked && c.id === 1)) as 1 | 0,
      groups: Number(checkedItems.some(c => c.checked && c.id === 2)) as 1 | 0,
      planing: Number(checkedItems.some(c => c.checked && c.id === 3)) as 1 | 0,
      limits: Number(checkedItems.some(c => c.checked && c.id === 4)) as 1 | 0,
      comments: Number(checkedItems.some(c => c.checked && c.id === 5)) as 1 | 0,
      tags: Number(checkedItems.some(c => c.checked && c.id === 6)) as 1 | 0,
      smart: Number(checkedItems.some(c => c.checked && c.id === 7)) as 1 | 0,
      forecast: Number(checkedItems.some(c => c.checked && c.id === 8)) as 1 | 0,
      advices: Number(checkedItems.some(c => c.checked && c.id === 9)) as 1 | 0,
    }).then(() => {
      LS.setItem(LSKeys.ShowThx, true);
      setThx(true);
      setLoading(false);
    });
  }, [checkedItems]);

  const toggleCheckItem = useCallback((id: number) => {
    setChecked(items =>
      items.some(v => v.id === id)
        ? items.map(v => (v.id === id ? { id, checked: !v.checked } : v))
        : items.concat({ id, checked: true }),
    );
  }, []);

  if (thxShow) {
    return <ThxLayout />;
  }

  return (
    <>
      <div className={appSt.container}>
        <div className={appSt.imgBox}>
          <div className={appSt.imgBoxText}>
            <Typography.TitleResponsive style={{ marginTop: '1rem' }} tag="h1" view="large" font="system" weight="bold">
              Персональный финансовый ассистент
            </Typography.TitleResponsive>
            <Typography.Text style={{ maxWidth: '230px' }} view="primary-medium">
              Выберите, что будет полезно именно вам
            </Typography.Text>
          </div>
          <img src={pfmMain} height={168} style={{ objectFit: 'contain' }} />
        </div>

        <Typography.TitleResponsive style={{ marginTop: '1.5rem' }} tag="h2" view="small" font="system" weight="semibold">
          Управление финансами
        </Typography.TitleResponsive>

        <div className={appSt.box}>
          <Switch
            block
            reversed
            checked={checkedItems.some(c => c.checked && c.id === 1)}
            label="Категории и подкатегории"
            hint="Разделяйте крупные категории на несколько"
            onChange={() => toggleCheckItem(1)}
            className={appSt.switchItem}
          />
          <Switch
            block
            reversed
            checked={checkedItems.some(c => c.checked && c.id === 2)}
            label="Группы категорий"
            hint="Объединяйте несколько категорий в группы, например: «Рестораны» и «Продукты» в группу «Еда»"
            onChange={() => toggleCheckItem(2)}
            className={appSt.switchItem}
          />
          <Switch
            block
            reversed
            checked={checkedItems.some(c => c.checked && c.id === 3)}
            label="Планирование расходов"
            hint="Устанавливайте лимиты на сумму расходов по категориям"
            onChange={() => toggleCheckItem(3)}
            className={appSt.switchItem}
          />
          <Collapse expanded={checkedItems.some(c => c.checked && c.id === 3)}>
            <Switch
              block
              reversed
              checked={checkedItems.some(c => c.checked && c.id === 4)}
              label="Уведомления о лимитах"
              onChange={() => toggleCheckItem(4)}
              className={appSt.switchItem}
            />
          </Collapse>

          <Switch
            block
            reversed
            checked={checkedItems.some(c => c.checked && c.id === 5)}
            label="Комментарии к расходам"
            hint="Добавляйте комментарии, чтобы не забыть детали"
            onChange={() => toggleCheckItem(5)}
            className={appSt.switchItem}
          />
          <Switch
            block
            reversed
            checked={checkedItems.some(c => c.checked && c.id === 6)}
            label="Теги для расходов"
            hint="Детализировать фильтры с помощью тегов"
            onChange={() => toggleCheckItem(6)}
            className={appSt.switchItem}
          />
        </div>

        <Typography.TitleResponsive style={{ marginTop: '1.5rem' }} tag="h2" view="small" font="system" weight="semibold">
          Финансовые помощники
        </Typography.TitleResponsive>

        <div className={appSt.box}>
          <Switch
            block
            reversed
            checked={checkedItems.some(c => c.checked && c.id === 7)}
            label="Умная аналитика"
            hint="Детальные графики и диаграммы расходов"
            onChange={() => toggleCheckItem(7)}
            className={appSt.switchItem}
          />
          <Switch
            block
            reversed
            checked={checkedItems.some(c => c.checked && c.id === 8)}
            label="Финансовый прогноз"
            hint="Прогноз будущих расходов, доходов и свободного остатка"
            onChange={() => toggleCheckItem(8)}
            className={appSt.switchItem}
          />
          <Switch
            block
            reversed
            checked={checkedItems.some(c => c.checked && c.id === 9)}
            label="Финансовые советы"
            hint="Подсказки для выгодного использования денег"
            onChange={() => toggleCheckItem(9)}
            className={appSt.switchItem}
          />
        </div>
      </div>
      <Gap size={96} />

      <div className={appSt.bottomBtn}>
        <ButtonMobile loading={loading} block view="primary" onClick={!checkedItems.length ? () => showWarn(true) : submit}>
          Продолжить
        </ButtonMobile>
      </div>
      <PopupSheet open={warnOpen} padding={0} onClose={() => showWarn(false)}>
        <div className={appSt.imgBoxText}>
          <Typography.TitleResponsive style={{ marginTop: '.5rem' }} tag="h3" view="small" font="system" weight="semibold">
            Вы ничего не выбрали
          </Typography.TitleResponsive>
          <Typography.Text view="primary-medium">
            Вы можете выбрать любые полезные для вас инструменты управления финансами. Это бесплатно.
          </Typography.Text>
          <ButtonMobile style={{ marginTop: '1rem' }} block view="primary" onClick={() => showWarn(false)}>
            Вернуться к выбору
          </ButtonMobile>
          <ButtonMobile block view="transparent" onClick={submit}>
            Мне это не интересно
          </ButtonMobile>
        </div>
      </PopupSheet>
    </>
  );
};
