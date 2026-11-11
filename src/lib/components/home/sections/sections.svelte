<script lang="ts">
	import SectionDefault from './section-default.svelte';
	import SectionFourth from './section-fourth.svelte';
	import SectionThird from './section-third.svelte';
	import Container from '#lib/components/core/button/container.svelte';
	import { SectionType, type Section } from '#lib/services';

	const { sections }: { sections: Section[] } = $props();
</script>

<Container>
	<div class="sections-wrapper">
		<div class="sections">
			{#each sections.slice(1) as section (section.id)}
				{@const isDefault =
					section.sectionType == SectionType.First || section.sectionType == SectionType.Fifth}
				{#if isDefault || section.sectionType == SectionType.Third || section.sectionType == SectionType.Fourth}
					{#if isDefault}
						<SectionDefault {section} />
					{:else if section.sectionType == SectionType.Third}
						<SectionThird {section} />
					{:else if section.sectionType == SectionType.Fourth}
						<SectionFourth {section} />
					{/if}
				{/if}
			{/each}
		</div>
	</div>
</Container>

<style lang="scss">
	.sections-wrapper {
		display: flex;
		flex-direction: column;
		gap: 60px;
		margin-top: 40px;

		.sections {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			gap: 60px;
			margin-top: 30px;
			width: 100%;
		}
	}
</style>
