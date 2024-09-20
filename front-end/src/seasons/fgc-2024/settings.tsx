import { Box } from '@mui/material';
import { FC, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  allClearColorAtom,
  blueWledWebSocketAddressAtom,
  centerWledWebSocketAddressAtom,
  fieldFaultColorAtom,
  fieldOptionsSelector,
  foodProductionDelayMsAtom,
  foodProductionMotorDurationMsAtom,
  foodProductionMotorSetpointAtom,
  foodResetMotorSetpointAtom,
  goalBlueOnlyColorAtom,
  goalEmptyColorAtom,
  goalFullColorAtom,
  goalFullSecondaryColorAtom,
  goalGreenOnlyColorAtom,
  goalLedLengthAtom,
  matchEndBlueNexusGoalColorAtom,
  matchEndRampColorAtom,
  matchEndRedNexusGoalColorAtom,
  prepareFieldColorAtom,
  rampBalancedColorAtom,
  rampHysteresisWindowMsAtom,
  rampLedLengthAtom,
  rampUnbalancedColorAtom,
  redWledWebSocketAddressAtom
} from './stores/settings-store';
import { NumberSetting } from 'src/apps/settings/components/number-setting';
import { useSocket } from 'src/api/use-socket';
import { FeedingTheFutureFCS } from '@toa-lib/models';
import { TextSetting } from 'src/apps/settings/components/text-setting';

export const Settings: FC = () => {
  const [socket] = useSocket();
  const [goalLedLength, setGoalLedLength] = useRecoilState(goalLedLengthAtom);
  const [rampLedLength, setRampLedLength] = useRecoilState(rampLedLengthAtom);
  const [allClearColor, setAllClearColor] = useRecoilState(allClearColorAtom);
  const [prepareFieldColor, setPrepareFieldColor] = useRecoilState(
    prepareFieldColorAtom
  );
  const [fieldFaultColor, setFieldFaultColor] =
    useRecoilState(fieldFaultColorAtom);
  const [matchEndRedNexusGoalColor, setMatchEndRedNexusGoalColor] =
    useRecoilState(matchEndRedNexusGoalColorAtom);
  const [matchEndBlueNexusGoalColor, setMatchEndBlueNexusGoalColor] =
    useRecoilState(matchEndBlueNexusGoalColorAtom);
  const [matchEndRampColor, setMatchEndRampColor] = useRecoilState(
    matchEndRampColorAtom
  );
  const [redWledWebSocketAddress, setRedWledWebSocketAddress] = useRecoilState(
    redWledWebSocketAddressAtom
  );
  const [blueWledWebSocketAddress, setBlueWledWebSocketAddress] =
    useRecoilState(blueWledWebSocketAddressAtom);
  const [centerWledWebSocketAddress, setCenterWledWebSocketAddress] =
    useRecoilState(centerWledWebSocketAddressAtom);
  const [foodProductionMotorSetpoint, setFoodProductionMotorSetpoint] =
    useRecoilState(foodProductionMotorSetpointAtom);
  const [foodProductionMotorDurationMs, setFoodProductionMotorDurationMs] =
    useRecoilState(foodProductionMotorDurationMsAtom);
  const [foodResetMotorSetpoint, setFoodResetMotorSetpoint] = useRecoilState(
    foodResetMotorSetpointAtom
  );
  const [foodProductionDelayMs, setFoodProductionDelayMs] = useRecoilState(
    foodProductionDelayMsAtom
  );
  const [rampHysteresisWindowMs, setRampHysteresisWindowMs] = useRecoilState(
    rampHysteresisWindowMsAtom
  );
  const [goalEmptyColor, setGoalEmptyColor] =
    useRecoilState(goalEmptyColorAtom);
  const [goalBlueOnlyColor, setGoalBlueOnlyColor] = useRecoilState(
    goalBlueOnlyColorAtom
  );
  const [goalGreenOnlyColor, setGoalGreenOnlyColor] = useRecoilState(
    goalGreenOnlyColorAtom
  );
  const [goalFullColor, setGoalFullColor] = useRecoilState(goalFullColorAtom);
  const [goalFullSecondaryColor, setGoalFullSecondaryColor] = useRecoilState(
    goalFullSecondaryColorAtom
  );
  const [rampBalancedColor, setRampBalancedColor] = useRecoilState(
    rampBalancedColorAtom
  );
  const [rampUnbalancedColor, setRampUnbalancedColor] = useRecoilState(
    rampUnbalancedColorAtom
  );

  const fieldOptions: FeedingTheFutureFCS.FieldOptions =
    useRecoilValue(fieldOptionsSelector);

  useEffect(() => {
    socket?.emit('fcs:settings', fieldOptions);
  }, [fieldOptions]);

  return (
    <Box>
      <NumberSetting
        name='Goal LED Length'
        value={goalLedLength}
        onChange={setGoalLedLength}
        type='number'
        inline
      />
      <NumberSetting
        name='Ramp LED Length'
        value={rampLedLength}
        onChange={setRampLedLength}
        type='number'
        inline
      />
      <TextSetting
        name='All Clear Color'
        value={allClearColor}
        onChange={setAllClearColor}
        inline
      />
      <TextSetting
        name='Prepare Field Color'
        value={prepareFieldColor}
        onChange={setPrepareFieldColor}
        inline
      />
      <TextSetting
        name='Field Fault Color'
        value={fieldFaultColor}
        onChange={setFieldFaultColor}
        inline
      />
      <TextSetting
        name='Match End Red Nexus Goal Color'
        value={matchEndRedNexusGoalColor}
        onChange={setMatchEndRedNexusGoalColor}
        inline
      />
      <TextSetting
        name='Match End Blue Nexus Goal Color'
        value={matchEndBlueNexusGoalColor}
        onChange={setMatchEndBlueNexusGoalColor}
        inline
      />
      <TextSetting
        name='Match End Ramp Color'
        value={matchEndRampColor}
        onChange={setMatchEndRampColor}
        inline
      />
      <TextSetting
        name='Red WLED WebSocket Address'
        value={redWledWebSocketAddress}
        onChange={setRedWledWebSocketAddress}
        inline
      />
      <TextSetting
        name='Blue WLED WebSocket Address'
        value={blueWledWebSocketAddress}
        onChange={setBlueWledWebSocketAddress}
        inline
      />
      <TextSetting
        name='Center WLED WebSocket Address'
        value={centerWledWebSocketAddress}
        onChange={setCenterWledWebSocketAddress}
        inline
      />
      <NumberSetting
        name='Food Production Motor Setpoint'
        value={foodProductionMotorSetpoint}
        onChange={setFoodProductionMotorSetpoint}
        step={0.1}
        min={-1}
        max={1}
        type='number'
        inline
      />
      <NumberSetting
        name='Food Production Motor Duration (ms)'
        value={foodProductionMotorDurationMs}
        onChange={setFoodProductionMotorDurationMs}
        type='number'
        inline
      />
      <NumberSetting
        name='Food Reset Motor Setpoint'
        value={foodResetMotorSetpoint}
        onChange={setFoodResetMotorSetpoint}
        step={0.1}
        min={-1}
        max={1}
        type='number'
        inline
      />
      <NumberSetting
        name='Food Production Delay (ms)'
        value={foodProductionDelayMs}
        onChange={setFoodProductionDelayMs}
        type='number'
        inline
      />
      <NumberSetting
        name='Ramp Hysteresis Window (ms)'
        value={rampHysteresisWindowMs}
        onChange={setRampHysteresisWindowMs}
        type='number'
        inline
      />
      <TextSetting
        name='Empty Goal Color'
        value={goalEmptyColor}
        onChange={setGoalEmptyColor}
        inline
      />
      <TextSetting
        name='Blue Only Goal Color'
        value={goalBlueOnlyColor}
        onChange={setGoalBlueOnlyColor}
        inline
      />
      <TextSetting
        name='Green Only Goal Color'
        value={goalGreenOnlyColor}
        onChange={setGoalGreenOnlyColor}
        inline
      />
      <TextSetting
        name='Full Goal Color'
        value={goalFullColor}
        onChange={setGoalFullColor}
        inline
      />
      <TextSetting
        name='Full Goal Secondary Color'
        value={goalFullSecondaryColor}
        onChange={setGoalFullSecondaryColor}
        inline
      />
      <TextSetting
        name='Ramp Balanced Color'
        value={rampBalancedColor}
        onChange={setRampBalancedColor}
        inline
      />
      <TextSetting
        name='Ramp Unbalanced Color'
        value={rampUnbalancedColor}
        onChange={setRampUnbalancedColor}
        inline
      />
    </Box>
  );
};
