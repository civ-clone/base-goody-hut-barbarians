import Action from '@civ-clone/core-goody-hut/Action';
import Barbarians from '../Barbarians';
import BarbariansRule from '../Rules/Barbarians';
import Effect from '@civ-clone/core-rule/Effect';
import GoodyHut from '@civ-clone/core-goody-hut/GoodyHut';
import PlayerUnit from '@civ-clone/core-unit/Unit';
import Rule from '@civ-clone/core-rule/Rule';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import { expect } from 'chai';

// Stand-ins: the action only hands them on.
const goodyHut = { name: 'hut' } as unknown as GoodyHut,
  unit = { name: 'unit' } as unknown as PlayerUnit;

describe('Barbarians', (): void => {
  it('is a goody-hut action, matched by its class name', (): void => {
    const action = new Barbarians(goodyHut, unit, new RuleRegistry());

    expect(action).instanceOf(Action);
    expect(action.goodyHut()).equal(goodyHut);
    expect(action.unit()).equal(unit);
    expect(Barbarians.name).equal('Barbarians');
    expect(Barbarians.transient).eql(['_ruleRegistry']);
  });

  it('processes the Barbarians rule with the hut and the unit when performed', (): void => {
    const ruleRegistry = new RuleRegistry(),
      calls: [GoodyHut, PlayerUnit][] = [];

    ruleRegistry.register(
      new BarbariansRule(
        new Effect((hut: GoodyHut, by: PlayerUnit): void => {
          calls.push([hut, by]);
        })
      )
    );

    const action = new Barbarians(goodyHut, unit, ruleRegistry);

    expect(calls).eql([]);

    action.perform();

    expect(calls).length(1);
    expect(calls[0][0]).equal(goodyHut);
    expect(calls[0][1]).equal(unit);
  });

  it('does nothing when no ruleset raises a horde', (): void => {
    expect((): void =>
      new Barbarians(goodyHut, unit, new RuleRegistry()).perform()
    ).not.throw();
  });
});

describe('Rules/Barbarians', (): void => {
  it('is a rule of its own, named Barbarians', (): void => {
    expect(BarbariansRule.prototype).instanceOf(Rule);
    expect(BarbariansRule.name).equal('Barbarians');
    expect(BarbariansRule).not.equal(Barbarians);
  });
});
