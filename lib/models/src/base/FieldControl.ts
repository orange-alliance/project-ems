//-----------------------------------------------------------------------------
// The use of generics in this file is primarily useful for enforcing that
// Field Control System clients can safely share a lot of parsing logic between
// init packets and update packets.
//-----------------------------------------------------------------------------

//-------------------------------------------
// Motor parameters
//-------------------------------------------
export interface MotorUpdateParameters {
  port: number;
  setpoint: number;
}
export interface MotorInitParameters extends MotorUpdateParameters {}

//-------------------------------------------
// Servo parameters
//-------------------------------------------
export interface ServoUpdateParameters {
  port: number;
  pulseWidth: number;
}
export interface ServoInitParameters extends ServoUpdateParameters {
  framePeriod: number;
}

//-------------------------------------------
// Digital input parameters
//-------------------------------------------
export interface DigitalTriggerOptions {
  triggerOnLow: boolean;
  fcsUpdateToSend: FieldControlUpdatePacket;
}
export interface DigitalInputUpdateParameters {
  channel: number;
  triggerOptions: DigitalTriggerOptions | null; // Will disable the trigger if null
}
export interface DigitalInputInitParameters
  extends DigitalInputUpdateParameters {}

//-------------------------------------------
// Hub parameters
//-------------------------------------------
export interface HubParameters<
  M extends MotorUpdateParameters,
  S extends ServoUpdateParameters,
  DI extends DigitalInputUpdateParameters
> {
  motors?: M[];
  servos?: S[];
  digitalInputs?: DI[];
}
export type HubInitParameters = HubParameters<
  MotorInitParameters,
  ServoInitParameters,
  DigitalInputInitParameters
>;
export type HubUpdateParameters = HubParameters<
  MotorUpdateParameters,
  ServoUpdateParameters,
  DigitalInputUpdateParameters
>;

//-------------------------------------------
// WLED parameters
//-------------------------------------------
export interface LedPatternUpdateParameters {
  color: string;
  targetSegments: number[];
}

export interface LedSegment {
  start: number;
  stop: number;
}

export interface WledInitParameters {
  address: string;
  segments: LedSegment[];
}

export interface WledUpdateParameters {
  patterns: LedPatternUpdateParameters[];
}

//-------------------------------------------
// Field Control packets
//-------------------------------------------
export interface FieldControlPacket<
  HubParametersType extends HubParameters<any, any, any>,
  WledParametersType
> {
  hubs: Record<number, HubParametersType>;
  wleds: Record<string, WledParametersType>;
}
export type FieldControlInitPacket = FieldControlPacket<
  HubInitParameters,
  WledInitParameters
>;
export type FieldControlUpdatePacket = FieldControlPacket<
  HubUpdateParameters,
  WledUpdateParameters
>;

//-------------------------------------------
// Field options
//-------------------------------------------

export interface FieldOptions {
  goalLedLength: number;
  rampLedLength: number;
  allClearColor: string;
  prepareFieldColor: string;
  fieldFaultColor: string;
  matchEndRedNexusGoalColor: string;
  matchEndBlueNexusGoalColor: string;
  matchEndRampColor: string;
  redWledWebSocketAddress: string;
  blueWledWebSocketAddress: string;
  centerWledWebSocketAddress: string;
  foodProductionMotorSetpoint: number;
  foodProductionMotorDurationSeconds: number;
  foodResetMotorSetpoint: number;
}

export const defaultFieldOptions: FieldOptions = {
  goalLedLength: 23,
  rampLedLength: 90,
  allClearColor: '00ff00',
  prepareFieldColor: 'ffff00',
  fieldFaultColor: 'ff0000',
  matchEndRedNexusGoalColor: 'ff0000',
  matchEndBlueNexusGoalColor: '0000ff',
  matchEndRampColor: 'ff00ff',
  redWledWebSocketAddress: '',
  blueWledWebSocketAddress: '',
  centerWledWebSocketAddress: '',
  foodProductionMotorSetpoint: 1.0,
  foodProductionMotorDurationSeconds: 5,
  foodResetMotorSetpoint: -0.5
};
