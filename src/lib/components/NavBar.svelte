<script>
	import Logo from '$lib/assets/logos/skyxpert-short-logo.png';
	let isOpened = false;
	let routes = [
		// { label: 'Mission & Vision', href: '#mission' },
		{ label: 'Team', href: '#team' },
		{ label: 'Drones', href: '#drone' },
		{ label: 'Partnerships', href: '#sponsors' },
		{ label: 'Next Steps', href: '#updates' },
		{ label: 'Contact Us', href: '#contactus' }
	];
</script>

<!-- check if Navbar is opened or not -->
<div class={isOpened ? 'NavBar opened' : 'NavBar'}>
	<div class="navContainer">
		<a href="/">
			<img src={Logo} alt="Logo" class="logo" />
		</a>

		<div class="navButtons">
			{#each routes as route}
				<a class="button" href={route.href}>{route.label}</a>
			{/each}
		</div>
	</div>
</div>

<button on:click={() => (isOpened = !isOpened)}>
	{isOpened ? 'Closed' : 'Opened'} Menu
</button>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	.NavBar {
		display: flex;
		justify-content: center;
		position: fixed;
		width: 100%;
		margin-top: 5vh;
		/*background: red;*/
		transition: background 0.3s;

		.navContainer {
			display: flex;
			justify-content: space-between;
			align-items: center;
			/*position: fixed;*/
			width: 90%;

			/*background: magenta;*/

			.navButtons {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				max-width: 600px;

				.button {
					position: relative;
					margin-left: 1em;
					color: white;
					font-family: 'Bull', monospace;
					font-size: 1.2em;

					&::after {
						content: '';
						position: absolute;
						bottom: -0.5em;
						left: 0;
						height: 2px;
						width: 100%;
						background-color: red;
						transform: scaleX(0);
						transform-origin: bottom;
						transition: transform 0.1s ease-in-out;
					}

					&:hover::after {
						transform: scaleX(1); /* animate underline in */
					}
				}
			}
		}
	}

	.logo {
		max-width: clamp(3rem, 5vw, 5rem);
	}

	.NavBar.opened {
		background: yellow;
	}
</style>
