<?php
if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

/**
 * KV Web 2025 Theme functions and definitions
 */

if (!function_exists('kvweb25_styles')):

	/**
	 * Enqueue frontend styles and scripts.
	 */
	function kvweb25_styles(): void
	{
		// Register theme stylesheet.
		$theme_version = wp_get_theme()->get('Version');

		// @phpstan-ignore function.alreadyNarrowedType
		$version_string = is_string($theme_version) ? $theme_version : false;

		// Enqueue theme stylesheet.
		wp_register_style(
			'kvweb25-style',
			get_template_directory_uri() . '/style.css',
			array(),
			$version_string
		);
		wp_enqueue_style('kvweb25-style');

		// Add view.js script
		$script_asset = include get_parent_theme_file_path('public/js/view.asset.php');
		wp_register_script(
			'kvweb25-script',
			get_parent_theme_file_uri('public/js/view.js'),
			$script_asset['dependencies'],
			$script_asset['version'],
			true // add to footer
		);
		wp_enqueue_script('kvweb25-script');

	}

endif;
add_action('wp_enqueue_scripts', 'kvweb25_styles');

function kvweb25_add_editor_script(): void
{
	$script_asset = include get_parent_theme_file_path('public/js/editor.asset.php');

	wp_enqueue_script(
		'kvweb25-editor',
		get_parent_theme_file_uri('public/js/editor.js'),
		$script_asset['dependencies'],
		$script_asset['version'],
		true
	);
}
add_action('enqueue_block_editor_assets', 'kvweb25_add_editor_script');

function kvweb25_block_styles(): void
{
	$style_asset = include get_parent_theme_file_path('public/css/block-styles.asset.php');

	wp_register_style(
		'kvweb25-block-styles',
		get_parent_theme_file_uri('public/css/block-styles.css'),
		$style_asset['dependencies'],
		$style_asset['version'],
	);

	wp_enqueue_style('kvweb25-block-styles');
}
add_action('enqueue_block_assets', 'kvweb25_block_styles');

/**
 * Include SVG icon sprite in the footer.
 */
function kvweb25_include_svg_icons(): void
{
	// Define SVG sprite file.
	$svg_icons = get_parent_theme_file_path('/assets/icons/svg-sprite.html');
	$svg_template = get_parent_theme_file_path('/assets/icons/svg-template.html');

	// If it exists, include it.
	if (file_exists($svg_icons) && file_exists($svg_template)) {
		require_once($svg_icons);
		require_once($svg_template);
	}
}
add_action('wp_footer', 'kvweb25_include_svg_icons', 9999);


/**
 * Disable loading of remote block patterns.
 */
add_filter('should_load_remote_block_patterns', '__return_false');

/**
 * Remove core block patterns.
 */
// function kvweb25_remove_core_patterns(): void
// {
// 	remove_theme_support('core-block-patterns');
// }
// add_action('after_setup_theme', 'kvweb25_remove_core_patterns');


/**
 * Registers pattern categories.
 */
function kvweb25_pattern_categories(): void
{

	register_block_pattern_category(
		'kvweb25_page',
		array(
			'label' => 'Seiten',
			'description' => 'Eine Sammlung von Mustern für komplette Seiten',
		)
	);
}
add_action('init', 'kvweb25_pattern_categories');