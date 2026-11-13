import { Action, IAction } from '@civ-clone/core-goody-hut/Action';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import BarbariansRule from './Rules/Barbarians';
import GoodyHut from '@civ-clone/core-goody-hut/GoodyHut';
import PlayerUnit from '@civ-clone/core-unit/Unit';

/**
 * The hut unleashes barbarians. The horde itself is the barbarians' to raise: a ruleset registers the `Barbarians`
 * rule that spawns it, so a game without barbarians gets nothing.
 */
export class Barbarians extends Action implements IAction {
  static readonly transient = ['_ruleRegistry'];
  private _ruleRegistry: RuleRegistry;

  constructor(
    goodyHut: GoodyHut,
    unit: PlayerUnit,
    ruleRegistry: RuleRegistry = ruleRegistryInstance
  ) {
    super(goodyHut, unit);

    this._ruleRegistry = ruleRegistry;
  }

  perform(): void {
    this._ruleRegistry.process(BarbariansRule, this.goodyHut(), this.unit());
  }
}

export default Barbarians;
