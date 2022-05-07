// ↓ IMPORT SYSTEMS HERE ↓
import a5e from './systems/a5e';
import dnd5e from './systems/dnd5e';
import generic from './systems/generic';
import pf2e from './systems/pf2e';
import swade from './systems/swade';

// ↑ IMPORT SYSTEMS HERE ↑

/**
 * NOTE: YOUR PULL REQUEST WILL NOT BE ACCEPTED IF YOU DO NOT
 * FOLLOW THE CONVENTION IN THE D&D 5E SYSTEM FILE
 */
export const SYSTEMS = {
  get DATA() {
    return {
      // ↓ ADD SYSTEMS HERE ↓
      a5e,
      dnd5e,
      generic,
      pf2e,
      swade,
      // ↑ ADD SYSTEMS HERE ↑
    }?.[game.system.id];
  },
};
