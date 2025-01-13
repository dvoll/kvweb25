<?php
/**
 * Plugin Name:       KV Basic Blocks
 * Description:       Basis Blöcke für die CVJM KV Website
 * Version:           0.1.0
 * Requires at least: 6.7
 * Requires PHP:      8.1
 * Author:            Dario Voll
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       kvweb25-blocks
 *
 * @package Kvweb25
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function kvweb25_blocks_block_init(): void {
	register_block_type( __DIR__ . '/build/homepage-hero' );
	register_block_type( __DIR__ . '/build/interactive' );
}
add_action( 'init', 'kvweb25_blocks_block_init' );
