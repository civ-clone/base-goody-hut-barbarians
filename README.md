# base-goody-hut-barbarians

This package provides the `Barbarians` (`...you have unleashed a horde of barbarians!`) `GoodyHut` action, and the
`Barbarians` rule (`Rules/Barbarians`) it processes with the hut and the unit that entered it.

A library: it registers no rules. The horde is the barbarians' to raise: a ruleset registers a `Barbarians` rule that
spawns it (see `civ1-barbarians`), so a game without barbarians gets nothing. When a hut unleashes barbarians rather
than another outcome is the ruleset's choice too (see `civ1-goody-hut`).
