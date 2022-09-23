import { FieldControlPacket } from '@toa-lib/models';

const LEFT_MOTOR_CHANNEL = 0;
const RIGHT_MOTOR_CHANNEL = 1;

const RED_BLINKIN_CHANNEL = 0;
const BLUE_BLINKIN_CHANNEL = 1;
const AUDIENCE_BLINKIN_CHANNEL = 2;

const LED_COLOR_BLACK = 1995;
const LED_COLOR_YELLOW = 1845;
const LED_COLOR_WHITE = 1965;
const LED_COLOR_PURPLE = 1955;
const LED_COLOR_GREEN = 1885;
const LED_COLOR_RED = 1805;
const LED_COLOR_RAINBOW = 1275;
const LED_COLOR_FIRE = 1215;
const FULL_STRIP_PWM = 990;

export const MOTOR_FORWARD: FieldControlPacket = {
  messages: [
    {
      hub: 0,
      function: 'motor',
      parameters: {
        port: LEFT_MOTOR_CHANNEL,
        setpoint: 15000
      }
    },
    {
      hub: 0,
      function: 'motor',
      parameters: {
        port: RIGHT_MOTOR_CHANNEL,
        setpoint: 15000
      }
    }
  ]
};

export const MOTOR_DISABLE: FieldControlPacket = {
  messages: [
    {
      hub: 0,
      function: 'motor',
      parameters: {
        port: LEFT_MOTOR_CHANNEL,
        setpoint: 0
      }
    },
    {
      hub: 0,
      function: 'motor',
      parameters: {
        port: RIGHT_MOTOR_CHANNEL,
        setpoint: 0
      }
    }
  ]
};

export const MOTOR_REVERSE: FieldControlPacket = {
  messages: [
    {
      hub: 0,
      function: 'motor',
      parameters: {
        port: LEFT_MOTOR_CHANNEL,
        setpoint: -15000
      }
    },
    {
      hub: 0,
      function: 'motor',
      parameters: {
        port: RIGHT_MOTOR_CHANNEL,
        setpoint: -15000
      }
    }
  ]
};

export const LED_PRESTART: FieldControlPacket = {
  messages: [
    {
      hub: 0,
      function: 'servo',
      parameters: {
        port: RED_BLINKIN_CHANNEL,
        pulsewidth: LED_COLOR_YELLOW
      }
    },
    {
      hub: 0,
      function: 'servo',
      parameters: {
        port: BLUE_BLINKIN_CHANNEL,
        pulsewidth: LED_COLOR_YELLOW
      }
    },
    {
      hub: 0,
      function: 'servo',
      parameters: {
        port: AUDIENCE_BLINKIN_CHANNEL,
        pulsewidth: LED_COLOR_YELLOW
      }
    },
    {
      hub: 0,
      function: 'servo',
      parameters: {
        port: RED_BLINKIN_CHANNEL,
        pulsewidth: FULL_STRIP_PWM
      }
    },
    {
      hub: 0,
      function: 'servo',
      parameters: {
        port: BLUE_BLINKIN_CHANNEL,
        pulsewidth: FULL_STRIP_PWM
      }
    },
    {
      hub: 0,
      function: 'servo',
      parameters: {
        port: AUDIENCE_BLINKIN_CHANNEL,
        pulsewidth: FULL_STRIP_PWM
      }
    }
  ]
};
export const LED_ALLCLEAR: FieldControlPacket = {
  messages: [
    {
      hub: 0,
      function: 'servo',
      parameters: {
        port: RED_BLINKIN_CHANNEL,
        pulsewidth: LED_COLOR_GREEN
      }
    },
    {
      hub: 0,
      function: 'servo',
      parameters: {
        port: BLUE_BLINKIN_CHANNEL,
        pulsewidth: LED_COLOR_GREEN
      }
    },
    {
      hub: 0,
      function: 'servo',
      parameters: {
        port: AUDIENCE_BLINKIN_CHANNEL,
        pulsewidth: LED_COLOR_GREEN
      }
    },
    {
      hub: 0,
      function: 'servo',
      parameters: {
        port: RED_BLINKIN_CHANNEL,
        pulsewidth: FULL_STRIP_PWM
      }
    },
    {
      hub: 0,
      function: 'servo',
      parameters: {
        port: BLUE_BLINKIN_CHANNEL,
        pulsewidth: FULL_STRIP_PWM
      }
    },
    {
      hub: 0,
      function: 'servo',
      parameters: {
        port: AUDIENCE_BLINKIN_CHANNEL,
        pulsewidth: FULL_STRIP_PWM
      }
    }
  ]
};
export const LED_FIELDFAULT: FieldControlPacket = {
  messages: [
    {
      hub: 0,
      function: 'servo',
      parameters: {
        port: RED_BLINKIN_CHANNEL,
        pulsewidth: LED_COLOR_RED
      }
    },
    {
      hub: 0,
      function: 'servo',
      parameters: {
        port: BLUE_BLINKIN_CHANNEL,
        pulsewidth: LED_COLOR_RED
      }
    },
    {
      hub: 0,
      function: 'servo',
      parameters: {
        port: AUDIENCE_BLINKIN_CHANNEL,
        pulsewidth: LED_COLOR_RED
      }
    },
    {
      hub: 0,
      function: 'servo',
      parameters: {
        port: RED_BLINKIN_CHANNEL,
        pulsewidth: FULL_STRIP_PWM
      }
    },
    {
      hub: 0,
      function: 'servo',
      parameters: {
        port: BLUE_BLINKIN_CHANNEL,
        pulsewidth: FULL_STRIP_PWM
      }
    },
    {
      hub: 0,
      function: 'servo',
      parameters: {
        port: AUDIENCE_BLINKIN_CHANNEL,
        pulsewidth: FULL_STRIP_PWM
      }
    }
  ]
};
export const LED_IDLE: FieldControlPacket = {
  messages: [
    {
      hub: 0,
      function: 'servo',
      parameters: {
        port: RED_BLINKIN_CHANNEL,
        pulsewidth: LED_COLOR_RAINBOW
      }
    },
    {
      hub: 0,
      function: 'servo',
      parameters: {
        port: BLUE_BLINKIN_CHANNEL,
        pulsewidth: LED_COLOR_RAINBOW
      }
    },
    {
      hub: 0,
      function: 'servo',
      parameters: {
        port: AUDIENCE_BLINKIN_CHANNEL,
        pulsewidth: LED_COLOR_RAINBOW
      }
    },
    {
      hub: 0,
      function: 'servo',
      parameters: {
        port: RED_BLINKIN_CHANNEL,
        pulsewidth: FULL_STRIP_PWM
      }
    },
    {
      hub: 0,
      function: 'servo',
      parameters: {
        port: BLUE_BLINKIN_CHANNEL,
        pulsewidth: FULL_STRIP_PWM
      }
    },
    {
      hub: 0,
      function: 'servo',
      parameters: {
        port: AUDIENCE_BLINKIN_CHANNEL,
        pulsewidth: FULL_STRIP_PWM
      }
    }
  ]
};
export const LED_COUNTDOWN: FieldControlPacket = {
  messages: [
    {
      hub: 0,
      function: 'servo',
      parameters: {
        port: RED_BLINKIN_CHANNEL,
        pulsewidth: LED_COLOR_PURPLE
      }
    },
    {
      hub: 0,
      function: 'servo',
      parameters: {
        port: BLUE_BLINKIN_CHANNEL,
        pulsewidth: LED_COLOR_PURPLE
      }
    },
    {
      hub: 0,
      function: 'servo',
      parameters: {
        port: AUDIENCE_BLINKIN_CHANNEL,
        pulsewidth: LED_COLOR_PURPLE
      }
    },
    {
      hub: 0,
      function: 'servo',
      parameters: {
        port: RED_BLINKIN_CHANNEL,
        pulsewidth: FULL_STRIP_PWM
      }
    },
    {
      hub: 0,
      function: 'servo',
      parameters: {
        port: BLUE_BLINKIN_CHANNEL,
        pulsewidth: FULL_STRIP_PWM
      }
    },
    {
      hub: 0,
      function: 'servo',
      parameters: {
        port: AUDIENCE_BLINKIN_CHANNEL,
        pulsewidth: FULL_STRIP_PWM
      }
    }
  ]
};
export const LED_DISABLE: FieldControlPacket = {
  messages: [
    {
      hub: 0,
      function: 'servo',
      parameters: {
        port: RED_BLINKIN_CHANNEL,
        pulsewidth: 1995
      }
    },
    {
      hub: 0,
      function: 'servo',
      parameters: {
        port: BLUE_BLINKIN_CHANNEL,
        pulsewidth: 1995
      }
    },
    {
      hub: 0,
      function: 'servo',
      parameters: {
        port: AUDIENCE_BLINKIN_CHANNEL,
        pulsewidth: 1995
      }
    }
  ]
};

export const LED_CARBON: FieldControlPacket = {
  messages: [
    {
      hub: 0,
      function: 'servo',
      parameters: {
        port: RED_BLINKIN_CHANNEL,
        pulsewidth: LED_COLOR_WHITE
      }
    },
    {
      hub: 0,
      function: 'servo',
      parameters: {
        port: BLUE_BLINKIN_CHANNEL,
        pulsewidth: LED_COLOR_WHITE
      }
    },
    {
      hub: 0,
      function: 'servo',
      parameters: {
        port: AUDIENCE_BLINKIN_CHANNEL,
        pulsewidth: LED_COLOR_WHITE
      }
    }
  ]
};

export const LED_COOPERTITION: FieldControlPacket = {
  messages: [
    {
      hub: 0,
      function: 'servo',
      parameters: {
        port: RED_BLINKIN_CHANNEL,
        pulsewidth: LED_COLOR_PURPLE
      }
    },
    {
      hub: 0,
      function: 'servo',
      parameters: {
        port: BLUE_BLINKIN_CHANNEL,
        pulsewidth: LED_COLOR_PURPLE
      }
    },
    {
      hub: 0,
      function: 'servo',
      parameters: {
        port: AUDIENCE_BLINKIN_CHANNEL,
        pulsewidth: LED_COLOR_PURPLE
      }
    }
  ]
};
export const LED_EMPTY: FieldControlPacket = {
  messages: [
    {
      hub: 0,
      function: 'servo',
      parameters: {
        port: RED_BLINKIN_CHANNEL
      }
    },
    {
      hub: 0,
      function: 'servo',
      parameters: {
        port: BLUE_BLINKIN_CHANNEL
      }
    },
    {
      hub: 0,
      function: 'servo',
      parameters: {
        port: AUDIENCE_BLINKIN_CHANNEL
      }
    }
  ]
};